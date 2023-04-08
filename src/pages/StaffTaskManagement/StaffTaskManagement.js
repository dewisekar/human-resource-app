import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '@windmill/react-ui';
import MoonLoader from 'react-spinners/MoonLoader';
import DataTable from 'react-data-table-component';
import { Link, useHistory } from 'react-router-dom';
import Collapse from 'rc-collapse';

import DatatableFilter from '../../components/Datatable/DatatableFilter/DatatableFilter';
import TableBadge from '../../components/TableBadge/TableBadge';
import TaskDetail from '../../components/TaskDetail/TaskDetail';
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal';
import SessionExpiredModal from '../../components/SessionExpiredModal/SessionExpiredModal';
import AlertModal from '../../components/AlertModal/AlertModal';
import constants from '../../constants';
import PageUtil from '../../utils/PageUtil';
import utils from '../../utils';
import config from './StaffTaskManagement.config';
import * as Icons from '../../icons';
import handlers from './StaffTaskManagement.handlers';

const { Panel } = Collapse;
const { PlusCircleIcon, EditIcon } = Icons;
const { COLOR, URL, PATH } = constants;
const { getRequest, isBetweenTwoDates } = utils;
const { columns, StatusEnum } = config;
const { customTableSort, convertDataToSelectOptions } = PageUtil;
const { updateStatusHandler } = handlers;

const StaffTaskManagement = () => {
  const [tasks, setTasks] = useState([]);
  const [todaysTasks, setTodaysTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterText, setFilterText] = useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [isConfirmationModalShown, setIsConfirmationModalShown] = useState(false);
  const [isSessionExpired, setIsSessionExpired] = useState(false);
  const [isAlertShown, setIsAlertShown] = useState(false);
  const [taskToBeUpdated, setTaskToBeUpdated] = useState({});
  const [alertMessage, setAlertMessage] = useState(null);
  const history = useHistory();
  const confirmationMessage = 'Are you sure you want to update this task\'s status? Changed status can not be revert';

  const renderActionButton = (id) => (
    <Button tag={Link} to={`${PATH.TaskManagement.EDIT}?id=${id}`} size="small" style={{ backgroundColor: COLOR.SALMON }}>
      <EditIcon className='w-4 h-4 mr-1'/>Edit
    </Button>
  );

  useEffect(() => {
    const init = async () => {
      const fetchedData = await getRequest(URL.TaskManagement.TASK);
      const mappedData = fetchedData.map((item) => {
        const {
          startDate, endDate, status, id,
        } = item;

        return {
          ...item,
          realStartDate: new Date(startDate),
          realEndDate: new Date(endDate),
          startDate: new Date(startDate).toLocaleDateString('id-ID'),
          endDate: new Date(endDate).toLocaleDateString('id-ID'),
          status: <TableBadge enumType={StatusEnum} content={status}/>,
          realStatus: status,
          action: renderActionButton(id),
        };
      });
      const filteredTodayTasks = mappedData.filter((item) => {
        const { realStartDate, realEndDate, realStatus } = item;
        return isBetweenTwoDates(realStartDate, realEndDate) && realStatus !== 'Done';
      });

      setTodaysTasks(filteredTodayTasks);
      setTasks(mappedData);
      setIsLoading(false);
    };

    init();
  }, []);

  const updateTaskStatus = (data) => {
    setTaskToBeUpdated(data);
    setIsConfirmationModalShown(true);
  };

  const onCancelUpdateTaskStatus = () => {
    setTaskToBeUpdated({});
    setIsConfirmationModalShown(false);
  };

  const reloadPage = () => window.location.reload();

  const onHandleUpdateTaskStatus = async () => {
    setIsConfirmationModalShown(false);
    const updateHandlers = {
      setIsSessionExpired,
      showAlert: () => setIsAlertShown(true),
      setAlertMessage,
      reloadPage,
    };
    await updateStatusHandler(taskToBeUpdated, updateHandlers);
  };

  const filteredItems = tasks.filter(
    (item) => {
      const {
        realStatus, startDate, endDate, name, priority,
      } = item;
      const searchableFileds = {
        realStatus, startDate, endDate, name, priority,
      };
      return Object.keys(searchableFileds).some((key) => searchableFileds[key]
        .toLowerCase().includes(filterText.toLowerCase()));
    },
  );

  const subHeaderComponent = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText('');
      }
    };

    return (
      <DatatableFilter
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
        buttonColor={COLOR.SALMON}
        size="100%"
      />
    );
  }, [filterText, resetPaginationToggle]);

  const renderSpinner = () => (
    <div className='grid' style={{ justifyContent: 'center' }}>
      <MoonLoader color={COLOR.SALMON} size={30} />
    </div>
  );

  const renderTodaysTasks = () => (
    <DataTable
      columns={columns}
      data={todaysTasks}
      expandableRows
      defaultSortFieldId={3}
      defaultSortAsc={false}
      expandableRowsComponent={TaskDetail}
      expandableRowsComponentProps={{ onStatusChange: updateTaskStatus } }
      sortFunction={customTableSort}
    />
  );

  const renderCard = () => (
    <DataTable
      columns={columns}
      data={filteredItems}
      pagination
      subHeader
      defaultSortFieldId={3}
      defaultSortAsc={false}
      subHeaderComponent={subHeaderComponent}
      expandableRows
      expandableRowsComponent={TaskDetail}
      expandableRowsComponentProps={{ onStatusChange: updateTaskStatus } }
      sortFunction={customTableSort}
    />
  );

  const renderContent = () => (
    <>
      <Collapse accordion={false}>
        <Panel header={`Today Tasks (${todaysTasks.length})`} headerClass="my-header-class">
          {renderTodaysTasks()}
        </Panel>
        <Panel header={`All Tasks (${tasks.length})`}ader="All Tasks">{renderCard()}</Panel>
      </Collapse>
    </>
  );

  return (
    <>
      <div className="mt-8 mb-2" style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <h2 className='m-0' style={{ fontWeight: '500' }}>
          Task Management
        </h2>
        <Button tag={Link} to={PATH.TaskManagement.ADD} size="small" className="font-semibold" style={{ padding: '7px', backgroundColor: COLOR.SALMON }}>
          <PlusCircleIcon className='w-4 h-4 mr-1'/>Add Task
        </Button>
      </div>
      {isLoading ? renderSpinner() : renderContent()}
      {isConfirmationModalShown && <ConfirmationModal message={confirmationMessage}
        onClose={onCancelUpdateTaskStatus} onConfirm={onHandleUpdateTaskStatus}/>}
      {isSessionExpired && <SessionExpiredModal history={history}/>}
      {isAlertShown
        && <AlertModal message={alertMessage} onClose={() => setIsAlertShown(false)}/>}
    </>
  );
};

export default StaffTaskManagement;
