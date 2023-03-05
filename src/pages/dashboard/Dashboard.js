import React, { useState, useEffect } from 'react';

import { Card, CardBody } from '@windmill/react-ui';

import PageTitle from '../../components/Typography/PageTitle';
import utils from '../../utils';
import RoundIcon from '../../components/RoundIcon';
import { PeopleIcon } from '../../icons';
import constants from '../../constants';

const { getRequest } = utils;
const { URL } = constants;

const Dashboard = () => {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const init = async () => {
      const fetchedUserInfo = await getRequest(URL.User.USER_URL);
      console.log(fetchedUserInfo);
      const {
        department: { name: departmentName },
        division: { name: divisionName },
        level,
      } = fetchedUserInfo;
      const roles = level.map((item) => <li style={{ listStyleType: 'none' }} key={item.id}>{item.name}</li>);
      setUserInfo({
        ...fetchedUserInfo,
        department: departmentName,
        division: divisionName,
        roles,
      });
    };

    init();
  }, []);

  return (
    <>
      <PageTitle>Dashboard</PageTitle>

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
    </>
  );
};

export default Dashboard;
