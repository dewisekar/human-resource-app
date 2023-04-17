import React, { useState, useEffect } from 'react';
import { Card, CardBody } from '@windmill/react-ui';
import DataTable from 'react-data-table-component';

import utils from '../../../utils';
import { DocumentIcon } from '../../../icons';
import constants from '../../../constants';
import RoundIcon from '../../../components/RoundIcon';
import InfoCard from '../../../components/Cards/InfoCard';
import Spinner from '../../../components/Spinner/Spinner';

const { getRequest } = utils;
const { URL } = constants;
const columns = [
  { name: 'Name', selector: (row) => row.name, sortable: true },
  { name: 'Assignee', selector: (row) => row.assignee, sortable: true },
  { name: 'Deadline', selector: (row) => row.endDate },
  { name: 'Priority', selector: (row) => row.priority },
];

const TaskOverview = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setNewsTasks] = useState([]);
  const [taskCount, setTaskCount] = useState({ notStarted: 0, onProgress: 0, done: 0 });

  useEffect(() => {
    const init = async () => {
      const fetchedNewestTasks = await getRequest(URL.TaskManagement.NEWEST_TASK);
      const fetchedAllTask = await getRequest(URL.TaskManagement.BOD_ALL);
      console.log(fetchedAllTask);
      const notStartedTasks = fetchedAllTask.filter(({ status }) => status === 'Not Started').length;
      const onProgressTasks = fetchedAllTask.filter(({ status }) => status === 'On Progress').length;
      const doneTasks = fetchedAllTask.filter(({ status }) => status === 'Done').length;

      const mappedTasks = fetchedNewestTasks.map((item) => {
        const { endDate, assignee: { name: assigneeName } } = item;
        const convertedEndDate = new Date(endDate).toLocaleDateString('id-ID');
        return { ...item, endDate: convertedEndDate, assignee: assigneeName };
      });

      setNewsTasks(mappedTasks);
      setTaskCount({ notStarted: notStartedTasks, onProgress: onProgressTasks, done: doneTasks });
      setIsLoading(false);
    };

    init();
  }, []);

  const renderNewestTasks = () => (
    <div className="grid grid-cols-12 gap-2 mt-1 mb-5">
      <div className="col-span-12">
        <div style={{ display: 'flex', alignItems: 'center' }} className="mb-3 mt-5">
          <DocumentIcon className='w-5 h-5 mr-2'/>
          <p className="text-md font-semibold text-gray-600">Newest Tasks</p>
        </div>
        <div className="col-span-12" style={{ maxHeight: '250px', overflowY: 'auto' }}>
          <DataTable
            columns={columns}
            data={tasks}
            dense
          />
        </div>
      </div>
    </div>
  );

  const renderTaskOverview = () => (
    <div className='grid grid-cols-12 gap-3 mt-3'>
      <div className="col-span-4">
        <InfoCard title="Not Started" value={taskCount.notStarted}>
          <RoundIcon
            icon={DocumentIcon}
            iconColorClass="text-red-500 dark:text-orange-100"
            bgColorClass="bg-red-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>
      </div>
      <div className="col-span-4">
        <InfoCard title="On Progress" value={taskCount.onProgress}>
          <RoundIcon
            icon={DocumentIcon}
            iconColorClass="text-yellow-500 dark:text-orange-100"
            bgColorClass="bg-yellow-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>
      </div>
      <div className="col-span-4">
        <InfoCard title="Done" value={taskCount.done}>
          <RoundIcon
            icon={DocumentIcon}
            iconColorClass="text-green-500 dark:text-orange-100"
            bgColorClass="bg-green-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>
      </div>
    </div>
  );

  const renderCard = () => (
    <Card className="mb-8 shadow-md">
      <CardBody className="pt-6 pb-6 pl-10 pr-10">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p className="text-md font-semibold text-gray">Task Management Overview</p>
        </div>
        {renderTaskOverview()}
        {renderNewestTasks()}
      </CardBody>
    </Card>
  );

  return (
    <>
      {isLoading ? <Spinner/> : renderCard()}
    </>
  );
};

export default TaskOverview;
