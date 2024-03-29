import React, { useState, useEffect, useMemo } from 'react';
import MoonLoader from 'react-spinners/MoonLoader';
import DataTable from 'react-data-table-component';
import { Link, useHistory } from 'react-router-dom';
import Collapse from 'rc-collapse';
import Select from 'react-select';
import { Button } from '@windmill/react-ui';

import DatatableFilter from '../../components/Datatable/DatatableFilter/DatatableFilter';
import TableBadge from '../../components/TableBadge/TableBadge';
import TaskDetail from '../../components/TaskDetail/TaskDetail';
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal';
import SessionExpiredModal from '../../components/SessionExpiredModal/SessionExpiredModal';
import AlertModal from '../../components/AlertModal/AlertModal';
import PageUtil from '../../utils/PageUtil';
import constants from '../../constants';
import utils from '../../utils';
import config from './SupervisorTaskManagement.config';
import handlers from './SupervisorTaskManagement.handlers';
import * as Icons from '../../icons';

const { Panel } = Collapse;
const { PlusCircleIcon, EditIcon, TrashIcon } = Icons;
const { COLOR, URL, PATH } = constants;
const {
  getRequest, isBetweenTwoDates, convertDataToSelectOptions, getUserId,
} = utils;
const { columns, StatusEnum } = config;
const { deleteTaskHandler } = handlers;
const { customTableSort } = PageUtil;

const SupervisorTaskManagement = () => {
  const [tasks, setTasks] = useState([]);
  const [todaysTasks, setTodaysTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterText, setFilterText] = useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [isConfirmationModalShown, setIsConfirmationModalShown] = useState(false);
  const [isSessionExpired, setIsSessionExpired] = useState(false);
  const [isAlertShown, setIsAlertShown] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [chosenEmployee, setChosenEmployee] = useState('');
  const [toBeDeletedTask, setToBeDeletedTask] = useState(null);
  const currentUserId = getUserId();
  const history = useHistory();
  const deleteConfirmationMessage = 'Are you sure you want to delete this task?';

  const deleteTask = (id) => {
    setToBeDeletedTask(id);
    setIsConfirmationModalShown(true);
  };

  useEffect(() => {
    const init = async () => {
      const fetchedData = await getRequest(URL.TaskManagement.SUPERVISOR);
      const fetchedSubordinates = await getRequest(URL.User.USER_SUBORDINATE_URL);
      const fetchedSelfInfo = await getRequest(URL.User.USER_URL);

      const { name: superiorName } = fetchedSelfInfo;
      const convertedEmployeeOption = convertDataToSelectOptions(fetchedSubordinates, 'name', 'name');
      const employeeOption = [...convertedEmployeeOption,
        { label: superiorName, value: superiorName }];

      const mappedTask = fetchedData.map((item) => {
        const {
          startDate, endDate, status, assignee: { name: assignee },
          assignerId, id,
        } = item;
        const isEditable = parseInt(currentUserId, 10) === assignerId;

        const action = isEditable
        && <>
          <Button tag={Link} to={`${PATH.TaskManagement.EDIT}?id=${id}`} size="small" style={{ backgroundColor: COLOR.SALMON }}>
            <EditIcon className='w-4 h-4 mr-1'/>Edit
          </Button>
          <Button onClick={() => deleteTask(id)} size="small" style={{ backgroundColor: COLOR.SALMON, marginLeft: '8px' }}>
            <TrashIcon className='w-4 h-4 mr-1'/>Delete
          </Button>
        </>;

        return {
          ...item,
          assignee,
          realStartDate: new Date(startDate),
          realEndDate: new Date(endDate),
          startDate: new Date(startDate).toLocaleDateString('id-ID'),
          endDate: new Date(endDate).toLocaleDateString('id-ID'),
          status: <TableBadge enumType={StatusEnum} content={status}/>,
          realStatus: status,
          action,
        };
      });
      const filteredTodayTasks = mappedTask.filter((item) => {
        const { realStartDate, realEndDate, realStatus } = item;
        return isBetweenTwoDates(realStartDate, realEndDate) && realStatus !== 'Done';
      });

      setEmployees(employeeOption);
      setTodaysTasks(filteredTodayTasks);
      setTasks(mappedTask);
      setIsLoading(false);
    };

    init();
  }, []);

  const onCancelDeleteTask = () => {
    setToBeDeletedTask(null);
    setIsConfirmationModalShown(false);
  };

  const reloadPage = () => window.location.reload();

  const onHandleDeleteTask = async () => {
    setIsConfirmationModalShown(false);
    const updateHandlers = {
      setIsSessionExpired,
      showAlert: () => setIsAlertShown(true),
      setAlertMessage,
      reloadPage,
    };
    await deleteTaskHandler(toBeDeletedTask, updateHandlers);
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
        .toLowerCase().includes(filterText.toLowerCase()))
        && item.assignee.toLowerCase().includes(chosenEmployee);
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
      <div className="grid grid-cols-12 gap-2" style={{ width: '100% ' }}>
        <div className="col-span-4">
          <Select placeholder="Assignee..." isClearable options={employees}
            onChange={(event) => setChosenEmployee(event ? event.value.toLowerCase() : '')}/>
        </div>
        <div className="col-span-8">
          <DatatableFilter
            onFilter={(e) => setFilterText(e.target.value)}
            onClear={handleClear}
            filterText={filterText}
            buttonColor={COLOR.SALMON}
            size="100%"
          />
        </div>
      </div>
    );
  }, [filterText, resetPaginationToggle, employees]);

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
      defaultSortFieldId={4}
      defaultSortAsc={false}
      expandableRowsComponent={TaskDetail}
      expandableRowsComponentProps={{ onStatusChange: () => {}, isUser: false } }
      sortFunction={customTableSort}
    />
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
        subHeaderComponent={subHeaderComponent}
        expandableRows
        expandableRowsComponent={TaskDetail}
        expandableRowsComponentProps={{ onStatusChange: () => {}, isUser: false } }
        sortFunction={customTableSort}
        paginationRowsPerPageOptions={[10, 25, 50, 100]}
      />
    </>
  );

  const renderContent = () => (
    <Collapse accordion={false}>
      <Panel header={`Today Tasks (${todaysTasks.length})`} headerClass="my-header-class">
        {renderTodaysTasks()}
      </Panel>
      <Panel header={`All Tasks (${tasks.length})`}>{renderAllTask()}</Panel>
    </Collapse>
  );

  return (
    <>
      <div className="mt-8 mb-2" style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <h2 className='m-0' style={{ fontWeight: '500' }}>
          Your Team Tasks
        </h2>
        <Button tag={Link} to={PATH.TaskManagement.ASSIGN} size="small" className="font-semibold" style={{ padding: '7px', backgroundColor: COLOR.SALMON }}>
          <PlusCircleIcon className='w-4 h-4 mr-1'/>Assign Task
        </Button>
      </div>
      {isLoading ? renderSpinner() : renderContent()}
      {isConfirmationModalShown && <ConfirmationModal message={deleteConfirmationMessage}
        onClose={onCancelDeleteTask} onConfirm={onHandleDeleteTask}/>}
      {isSessionExpired && <SessionExpiredModal history={history}/>}
      {isAlertShown
        && <AlertModal message={alertMessage} onClose={() => setIsAlertShown(false)}/>}
    </>
  );
};

export default SupervisorTaskManagement;
