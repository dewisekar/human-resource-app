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

const { PlusCircleIcon, EditIcon, TrashIcon } = Icons;
const {
  COLOR, URL, PATH, TaskStatusOptions,
} = constants;
const { getRequest, convertDataToSelectOptions, getUserId } = utils;
const { columns, StatusEnum } = config;
const { deleteTaskHandler } = handlers;
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
  const [alertMessage, setAlertMessage] = useState(null);
  const [department, setDepartment] = useState([]);
  const [chosenDepartment, setChosenDepartment] = useState('');
  const [chosenStatus, setChosenStatus] = useState('');
  const history = useHistory();
  const currentUserId = getUserId();
  const [toBeDeletedTask, setToBeDeletedTask] = useState(null);
  const deleteConfirmationMessage = 'Are you sure you want to delete this task?';

  useEffect(() => {
    const init = async () => {
      const fetchedDepartment = await getRequest(URL.Organization.DEPARTMENT_ALL_URL);
      const convertedDepartmentOptions = convertDataToSelectOptions(fetchedDepartment, 'id', 'name');

      setDepartment([allOption, ...convertedDepartmentOptions]);
      setIsLoading(false);
    };

    init();
  }, []);

  const deleteTask = (id) => {
    setToBeDeletedTask(id);
    setIsConfirmationModalShown(true);
  };

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

        setTasks(mappedTask);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    init();
  }, [chosenDepartment]);

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
    <div className="grid grid-cols-12 gap-2 mt-4" style={{ width: '100% ' }}>
      <div className="col-span-3">
        <Select placeholder="Department..." options={department}
          onChange={(event) => setChosenDepartment(event ? event.value : '')}
          defaultValue={allOption}
        />
      </div>
      <div className="col-span-3">
        <Select placeholder="Status..." options={TaskStatusOptions}
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
        expandableRowsComponentProps={{ onStatusChange: () => {}, isUser: false } }
        sortFunction={customTableSort}
        paginationResetDefaultPage={resetPaginationToggle}
        paginationRowsPerPageOptions={[10, 25, 50, 100]}
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
      {isConfirmationModalShown && <ConfirmationModal message={deleteConfirmationMessage}
        onClose={onCancelDeleteTask} onConfirm={onHandleDeleteTask}/>}
      {isSessionExpired && <SessionExpiredModal history={history}/>}
      {isAlertShown
        && <AlertModal message={alertMessage} onClose={() => setIsAlertShown(false)}/>}
    </>
  );
};

export default BodTodayTaskManagement;
