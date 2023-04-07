import React, { useState, useEffect, useMemo } from 'react';
import MoonLoader from 'react-spinners/MoonLoader';
import DataTable from 'react-data-table-component';
import { useHistory } from 'react-router-dom';
import Collapse from 'rc-collapse';
import Select from 'react-select';

import SectionTitle from '../../components/Typography/SectionTitle';
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

const { Panel } = Collapse;
const { COLOR, URL } = constants;
const { getRequest, isBetweenTwoDates, convertDataToSelectOptions } = utils;
const { columns, StatusEnum } = config;
const { updateStatusHandler } = handlers;
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
  const [taskToBeUpdated, setTaskToBeUpdated] = useState({});
  const [alertMessage, setAlertMessage] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [chosenEmployee, setChosenEmployee] = useState('');
  const history = useHistory();
  const confirmationMessage = 'Are you sure you want to update this task\'s status? Changed status can not be revert';

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
          <Select className='mt-5 mb-5' placeholder="Assignee..." isClearable options={employees}
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
      expandableRowsComponentProps={{ onStatusChange: updateTaskStatus, isUser: false } }
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
        expandableRowsComponentProps={{ onStatusChange: updateTaskStatus, isUser: false } }
        sortFunction={customTableSort}
      />
    </>
  );

  const renderContent = () => (
    <Collapse accordion={false}>
      <Panel header="TODAY TASKS" headerClass="my-header-class">
        {renderTodaysTasks()}
      </Panel>
      <Panel header="ALL TASKS">{renderAllTask()}</Panel>
    </Collapse>
  );

  return (
    <>
      <div className="mt-8">
        <SectionTitle>Your Department Tasks</SectionTitle>
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

export default SupervisorTaskManagement;
