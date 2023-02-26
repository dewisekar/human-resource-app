import React, { useState, useEffect } from 'react';
import {
  Card, CardBody, Button, Badge,
} from '@windmill/react-ui';
import MoonLoader from 'react-spinners/MoonLoader';
import {
  Link, useLocation, Redirect, useHistory,
} from 'react-router-dom';

import SectionTitle from '../../components/Typography/SectionTitle';
import VerticalTable from '../../components/VerticalTable/VerticalTable';
import constants from '../../constants';
import utils from '../../utils';
import config from './OvertimeDetail.config';
import * as Icons from '../../icons';
import { baseUrl } from '../../config';

const { DownloadIcon } = Icons;
const {
  COLOR, URL, PATH, Accessibility,
} = constants;
const { getRequest, checkPageIdIsValid, getRole } = utils;
const { requestFields, approvalFields, dateOptions } = config;

const OvertimeDetail = () => {
  const location = useLocation();
  const history = useHistory();
  const pageParams = new URLSearchParams(location.search);
  const id = pageParams.get('id');
  const isIdValid = checkPageIdIsValid(id);
  const [overtimeData, setOvertimeData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const urlDownload = baseUrl + URL.Overtime.DOWNLOAD_PROOF_URL + id;
  const roles = getRole();
  const isAdmin = roles.includes(Accessibility.ADMIN);
  const backUrl = isAdmin ? PATH.Overtime.SUMMARY : PATH.Overtime.LIST_REQUEST;

  const renderStatusBadge = (status) => {
    const Status = {
      PENDING: 'primary',
      APPROVED: 'success',
      REJECTED: 'danger',
    };

    return <Badge type={Status[status]} className="px-10 py-1" style={{ fontSize: '14px' }}>{status}</Badge>;
  };

  const onDownload = () => {
    window.location.href = urlDownload;
  };

  const convertData = (data) => {
    const {
      createdAt, supportingDocument, approvalDate, status,
      overtimeDate, ...otherProps
    } = data;

    const convertedCreatedAt = new Date(createdAt).toLocaleDateString('id-ID', dateOptions);
    const convertedOvertimeDate = new Date(overtimeDate).toLocaleDateString('id-ID', dateOptions);
    const convertedApprovalDate = approvalDate ? new Date(approvalDate).toLocaleDateString('id-ID', dateOptions) : '';
    const convertedProof = <Button block size="small" style={{ width: '143px', backgroundColor: COLOR.BLUE }} onClick={onDownload}>
        <DownloadIcon className='w-4 h-4 mr-3'/>Download
      </Button>;
    const convertedStatus = renderStatusBadge(status);

    return {
      createdAt: convertedCreatedAt,
      overtimeDate: convertedOvertimeDate,
      approvalDate: convertedApprovalDate,
      supportingDocument: convertedProof,
      status: convertedStatus,
      ...otherProps,
    };
  };

  useEffect(() => {
    const init = async () => {
      try {
        const url = isAdmin ? URL.Overtime.OVERTIME_ADMIN_DETAIL_URL
          : URL.Overtime.OVERTIME_DETAIL_URL;
        const fetchedDetail = await getRequest(url + id);
        const convertedData = convertData(fetchedDetail);
        setOvertimeData(convertedData);
      } catch (error) {
        history.replace(PATH.Dashboard);
      }

      setIsLoading(false);
    };

    init();
  }, []);

  const renderSpinner = () => (
      <div className='grid' style={{ justifyContent: 'center' }}>
        <MoonLoader color={COLOR.BLUE} size={30} />
      </div>
  );

  const renderTable = (data, fields) => (
    <VerticalTable data={data} fields={fields}/>
  );

  const renderCard = () => (
    <Card className="mb-8 shadow-md">
      <CardBody>
        <p className="text-md font-semibold text-gray-500">Request Detail</p>
        <div>{renderTable(overtimeData, requestFields)}</div>
        <hr className="mt-6 mb-4" style={{ width: '100%' }}></hr>
        <p className="text-md font-semibold text-gray-500">Approval Detail</p>
        <div>{renderTable(overtimeData, approvalFields)}</div>
        <Button tag={Link} to={backUrl} layout="outline">
          Back
        </Button>
      </CardBody>
    </Card>
  );

  const renderPage = () => (
    <>
      <div className="mt-8">
        <SectionTitle>Overtime Detail</SectionTitle>
      </div>
      {isLoading ? renderSpinner() : renderCard()}
    </>
  );

  return (<>{ isIdValid ? renderPage() : <Redirect to={PATH.Dashboard} />}</>);
};

export default OvertimeDetail;
