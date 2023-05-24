import React, { useState, useEffect } from 'react';

import utils from '../../../utils';
import constants from '../../../constants';
import Spinner from '../../../components/Spinner/Spinner';
import BannerWithLink from '../../../components/BannerWithLink/BannerWithLink';

const { getRequest, getRole } = utils;
const { URL, Accessibility, PATH } = constants;

const RequestNotification = () => {
  const userRoles = getRole();
  const isAdmin = userRoles.includes(Accessibility.ADMIN);
  const isSupervisor = userRoles.includes(Accessibility.SUPERVISOR);
  const subtitle = 'Lihat request';
  const [isLoading, setIsLoading] = useState(true);
  const [reimbursement, setReimbursement] = useState(0);
  const [overtime, setOvertime] = useState(0);
  const reimbursementMessage = `Kamu mendapatkan ${reimbursement} request reimbursement!`;
  const overtimeMessage = `Kamu mendapatkan ${overtime} request overtime!`;

  useEffect(() => {
    const init = async () => {
      const fetchedReimbursement = await getRequest(URL.Reimbursement.PENDING_REQUEST);
      const fetchedOvertime = await getRequest(URL.Overtime.PENDING_REQUEST);
      setReimbursement(fetchedReimbursement.length);
      setOvertime(fetchedOvertime.length);
      setIsLoading(false);
    };

    init();
  }, []);

  const renderContent = () => (
    <>
      {isAdmin && reimbursement !== 0
      && <BannerWithLink message={reimbursementMessage}
        link={PATH.Reimbursement.LIST_ADMIN} subtitle={subtitle} color='green'/>}
      {isSupervisor && overtime !== 0
      && <BannerWithLink message={overtimeMessage}
        link={PATH.Overtime.LIST_SUPERVISOR} subtitle={subtitle} color='gray'/>}
    </>
  );

  return (
    <>
      {isLoading ? <Spinner/> : renderContent()}
    </>
  );
};

export default RequestNotification;
