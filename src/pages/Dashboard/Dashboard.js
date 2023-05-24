import React, { useState, useEffect } from 'react';

import { Card, CardBody } from '@windmill/react-ui';

import PageTitle from '../../components/Typography/PageTitle';
import utils from '../../utils';
import RoundIcon from '../../components/RoundIcon';
import { PeopleIcon } from '../../icons';
import constants from '../../constants';
import EmployeeOverview from './EmployeeOverview/EmployeeOverview';
import TaskOverview from './TaskOverview/TaskOverview';
import AttendanceOverview from './AttendanceOverview/AttendanceOverview';
import AttendanceRegistration from './AttendanceRegistration/AttendanceRegistration';
import RequestNotification from './RequestNotification/RequestNotification';

const { getRequest, getRole } = utils;
const { URL, Accessibility } = constants;

const Dashboard = () => {
  const [userInfo, setUserInfo] = useState({});
  const userRoles = getRole();
  const showOverview = userRoles.includes(Accessibility.BOD)
  || userRoles.includes(Accessibility.ADMIN);
  const showNotification = userRoles.includes(Accessibility.SUPERVISOR)
  || userRoles.includes(Accessibility.ADMIN);

  useEffect(() => {
    const init = async () => {
      const fetchedUserInfo = await getRequest(URL.User.USER_URL);
      const { level } = fetchedUserInfo;
      const roles = level.map((item) => <li style={{ listStyleType: 'none' }} key={item.id}>{item.name}</li>);
      setUserInfo({
        ...fetchedUserInfo,
        roles,
      });
    };

    init();
  }, []);

  const renderDefaultDashboard = () => (
    <Card className="mb-8 shadow-md">
      <CardBody className="p-10">
        <div className="grid grid-cols-12 gap-2 mt-1 mb-5">
          <div className="col-span-12 text-center md:col-span-2">
            <RoundIcon
              icon={PeopleIcon}
              iconColorClass="text-blue-500"
              bgColorClass="bg-blue-100"
              className="inline-block mt-3 mb-3"
              iconStyle="w-12 h-12"
            />
          </div>
          <div className="col-span-12 md:col-span-10">
            <p className="text-lg font-semibold text-gray-600" style={{ fontSize: '15px' }}>Hello,</p>
            <h1 className="text-2xl font-semibold text-gray-700">{userInfo.name}</h1>

            <div className="grid grid-cols-12 gap-2 mt-3">
              <div className="col-span-4">
                <div className=''>
                  <p className="text-lg font-semibold text-gray-400" style={{ fontSize: '12px' }}>Job Title</p>
                  <p className="text-md font-semibold text-gray">{userInfo.jobTitle}</p>
                </div>
                <div className='mt-2'>
                  <p className="text-lg font-semibold text-gray-400" style={{ fontSize: '12px' }}>Division</p>
                  <p className="text-md font-semibold text-gray">{userInfo.division}</p>
                </div>
                <div className='mt-2'>
                  <p className="text-lg font-semibold text-gray-400" style={{ fontSize: '12px' }}>Department</p>
                  <p className="text-md font-semibold text-gray">{userInfo.department}</p>
                </div>
                <div className='mt-2'>
                  <p className="text-lg font-semibold text-gray-400" style={{ fontSize: '12px' }}>Superior</p>
                  <p className="text-md font-semibold text-gray">{userInfo.superior}</p>
                </div>
              </div>
              <div className="col-span-4">
                <div className=''>
                  <p className="text-lg font-semibold text-gray-400" style={{ fontSize: '12px' }}>Username</p>
                  <p className="text-md font-semibold text-gray">{userInfo.username}</p>
                </div>
                <div className='mt-2'>
                  <p className="text-lg font-semibold text-gray-400" style={{ fontSize: '12px' }}>Fingerprint Machine PIN</p>
                  <p className="text-md font-semibold text-gray">{userInfo.fingerprintPin}</p>
                </div>
                <div className='mt-2'>
                  <p className="text-lg font-semibold text-gray-400" style={{ fontSize: '12px' }}>System Roles</p>
                  <p className="text-md font-semibold text-gray">{userInfo.roles}</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </CardBody>
    </Card>
  );

  const renderOverviewDashboard = () => (
    <>
      <div className='grid grid-cols-12 gap-5'>
        <div className='col-span-6'>
          <EmployeeOverview/>
        </div>
        <div className='col-span-6'>
          <AttendanceRegistration/>
        </div>
      </div>
      <AttendanceOverview/>
      <TaskOverview/>
    </>);

  const renderNotification = () => (
    <RequestNotification/>
  );

  return (
    <>
      <PageTitle>Dashboard</PageTitle>
      {showNotification && renderNotification()}
      {renderDefaultDashboard()}
      {showOverview && renderOverviewDashboard()}
    </>
  );
};

export default Dashboard;
