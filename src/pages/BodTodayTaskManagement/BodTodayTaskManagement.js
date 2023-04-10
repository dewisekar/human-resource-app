import React, { useState, useEffect } from 'react';
import MoonLoader from 'react-spinners/MoonLoader';
import DataTable from 'react-data-table-component';
import { Link, useHistory } from 'react-router-dom';
import Select from 'react-select';
import { Button, Card, CardBody } from '@windmill/react-ui';

import DatatableFilter from '../../components/Datatable/DatatableFilter/DatatableFilter';
import TableBadge from '../../components/TableBadge/TableBadge';
import TaskDetail from '../../components/TaskDetail/TaskDetail';
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal';
import SessionExpiredModal from '../../components/SessionExpiredModal/SessionExpiredModal';
import AlertModal from '../../components/AlertModal/AlertModal';
import PageUtil from '../../utils/PageUtil';
import constants from '../../constants';
import utils from '../../utils';
import config from './BodTodayTaskManagement.config';
import handlers from './BodTodayTaskManagement.handlers';
import * as Icons from '../../icons';

const { PlusCircleIcon } = Icons;
const {
  COLOR, URL, PATH, TaskStatusOptions,
} = constants;
const { getRequest, convertDataToSelectOptions } = utils;
const { columns, StatusEnum } = config;
const { updateStatusHandler } = handlers;
const { customTableSort } = PageUtil;

const BodTodayTaskManagement = () => {
  const allOption = { value: 'ALL', label: 'All Department' };
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterText, setFilterText] = useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [isConfirmationModalShown, setIsConfirmationModalShown] = useState(false);
  const [isSessionExpired, setIsSessionExpired] = useState(false);
  const [isAlertShown, setIsAlertShown] = useState(false);
  const [taskToBeUpdated, setTaskToBeUpdated] = useState({});
  const [alertMessage, setAlertMessage] = useState(null);
  const [department, setDepartment] = useState([]);
  const [chosenDepartment, setChosenDepartment] = useState('');
  const [chosenStatus, setChosenStatus] = useState('');
  const history = useHistory();
  const confirmationMessage = 'Are you sure you want to update this task\'s status? Changed status can not be revert';

  useEffect(() => {
    const init = async () => {
      const fetchedDepartment = await getRequest(URL.Organization.DEPARTMENT_ALL_URL);
      const convertedDepartmentOptions = convertDataToSelectOptions(fetchedDepartment, 'id', 'name');

      setDepartment([allOption, ...convertedDepartmentOptions]);
      setIsLoading(false);
    };

    init();
  }, []);

  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      const isAllDepartment = chosenDepartment === 'ALL';
      const url = URL.TaskManagement.BOD_TODAY;
      const finalUrl = isAllDepartment ? url : `${url}?departmentId=${chosenDepartment}`;

      try {
        const fetchedData = await getRequest(finalUrl);
        const mappedTask = fetchedData.map((item) => {
          const {
            startDate, endDate, status, assignee: { name: assignee },
          } = item;
          return {
            ...item,
            assignee,
            realStartDate: new Date(startDate),
            realEndDate: new Date(endDate),
            startDate: new Date(startDate).toLocaleDateString('id-ID'),
            endDate: new Date(endDate).toLocaleDateString('id-ID'),
            status: <TableBadge enumType={StatusEnum} content={status}/>,
            realStatus: status,
          };
        });

        setTasks(mappedTask);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    init();
  }, [chosenDepartment]);

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
        realStatus, startDate, endDate, name, priority, assignee,
      } = item;
      const searchableFileds = {
        startDate, endDate, name, priority, assignee,
      };
      const statusFilter = chosenStatus === '' ? realStatus
        : realStatus.toLowerCase() === chosenStatus.toLowerCase();

      return (Object.keys(searchableFileds).some((key) => searchableFileds[key]
        .toLowerCase().includes(filterText.toLowerCase())) && statusFilter);
    },
  );

  const handleClearFilter = () => {
    if (filterText) {
      setResetPaginationToggle(!resetPaginationToggle);
      setFilterText('');
    }
  };

  const renderFilter = () => (
    <div className="grid grid-cols-12 gap-2" style={{ width: '100% ' }}>
      <div className="col-span-3">
        <Select className='mt-5 mb-5' placeholder="Department..." options={department}
          onChange={(event) => setChosenDepartment(event ? event.value : '')}
          defaultValue={allOption}
        />
      </div>
      <div className="col-span-3">
        <Select className='mt-5 mb-5' placeholder="Status..." options={TaskStatusOptions}
          onChange={(event) => setChosenStatus(event ? event.value : '')}
          isClearable
        />
      </div>
      <div className="col-span-6">
        <DatatableFilter
          onFilter={(e) => setFilterText(e.target.value)}
          onClear={handleClearFilter}
          filterText={filterText}
          buttonColor={COLOR.SALMON}
          size="100%"
        />
      </div>
    </div>
  );

  const renderSpinner = () => (
    <div className='grid' style={{ justifyContent: 'center' }}>
      <MoonLoader color={COLOR.SALMON} size={30} />
    </div>
  );

  const renderAllTask = () => (
    <>
      <DataTable
        columns={columns}
        data={filteredItems}
        pagination
        subHeader
        defaultSortFieldId={4}
        defaultSortAsc={false}
        expandableRows
        expandableRowsComponent={TaskDetail}
        expandableRowsComponentProps={{ onStatusChange: updateTaskStatus, isUser: false } }
        sortFunction={customTableSort}
        paginationResetDefaultPage={resetPaginationToggle}
      />
    </>
  );

  const renderContent = () => (
    <Card className="mb-8 shadow-md data-table">
      <CardBody style={{ minHeight: '400px' }}>
        {renderFilter()}
        {isLoading ? renderSpinner() : renderAllTask()}
      </CardBody>
    </Card>
  );

  return (
    <>
      <div className="mt-8 mb-5" style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <h2 className='m-0' style={{ fontWeight: '500' }}>
          {'Today\'s Tasks'}
        </h2>
        <Button tag={Link} to={PATH.TaskManagement.ASSIGN} size="small" className="font-semibold" style={{ padding: '7px', backgroundColor: COLOR.SALMON }}>
          <PlusCircleIcon className='w-4 h-4 mr-1'/>Assign Task
        </Button>
      </div>
      {renderContent()}
      {isConfirmationModalShown && <ConfirmationModal message={confirmationMessage}
        onClose={onCancelUpdateTaskStatus} onConfirm={onHandleUpdateTaskStatus}/>}
      {isSessionExpired && <SessionExpiredModal history={history}/>}
      {isAlertShown
        && <AlertModal message={alertMessage} onClose={() => setIsAlertShown(false)}/>}
    </>
  );
};

export default BodTodayTaskManagement;
