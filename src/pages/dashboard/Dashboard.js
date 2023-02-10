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
      const fetchedUserInfo = await getRequest(URL.USER_URL);
      setUserInfo(fetchedUserInfo);
    };

    init();
  }, []);

  return (
    <>
      <PageTitle>Dashboard</PageTitle>

      <Card className="mb-8 shadow-md">
        <CardBody className="text-center">
        <p className="text-lg text-gray-500 mt-5">
            Hello,
          </p>
        <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-blue-500"
            bgColorClass="bg-blue-100"
            className="inline-block mt-3 mb-3"
            iconStyle="w-10 h-10"
          />
          <h1 className="text-2xl font-semibold text-gray-700">{userInfo.name}</h1>
          <p className="text-md text-gray">{userInfo.jobTitle}</p>
          <p className="text-md text-gray">{userInfo.nik}</p>
          <p className="text-md text-gray mb-5">{userInfo.username}</p>
        </CardBody>
      </Card>
    </>
  );
};

export default Dashboard;
