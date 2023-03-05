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
import RupiahCurrency from '../../components/RupiahCurrency/RupiahCurrency';
import constants from '../../constants';
import utils from '../../utils';
import config from './ReimbursementDetail.config';
import * as Icons from '../../icons';
import { baseUrl } from '../../config';

const { DownloadIcon } = Icons;
const { COLOR, URL, PATH } = constants;
const { getRequest, checkPageIdIsValid } = utils;
const { requestFields, approvalFields, dateOptions } = config;

const ReimbursementDetail = () => {
  const location = useLocation();
  const history = useHistory();
  const pageParams = new URLSearchParams(location.search);
  const id = pageParams.get('id');
  const isIdValid = checkPageIdIsValid(id);
  const [reimbursementData, setReimbursementData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const urlDownload = baseUrl + URL.Reimbursement.DOWNLOAD_PROOF_URL + id;

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
      createdAt, invoiceDate, proof, approvalDate,
      requestedAmount, approvedAmount, status, reimbursementType, ...otherProps
    } = data;

    const convertedCreatedAt = new Date(createdAt).toLocaleDateString('id-ID', dateOptions);
    const convertedInvoiceDate = new Date(invoiceDate).toLocaleDateString('id-ID', dateOptions);
    const convertedApprovalDate = approvalDate ? new Date(approvalDate).toLocaleDateString('id-ID', dateOptions) : '';
    const convertedRequestedAmount = <RupiahCurrency balance={requestedAmount}/>;
    const convertedApprovedAmount = approvedAmount ? <RupiahCurrency balance={approvedAmount}/> : '';
    const convertedProof = <Button block size="small" style={{ width: '143px', backgroundColor: COLOR.LIGHT_PURPLE }} onClick={onDownload}>
      <DownloadIcon className='w-4 h-4 mr-3'/>Download
    </Button>;
    const convertedStatus = renderStatusBadge(status);

    return {
      createdAt: convertedCreatedAt,
      invoiceDate: convertedInvoiceDate,
      approvalDate: convertedApprovalDate,
      requestedAmount: convertedRequestedAmount,
      approvedAmount: convertedApprovedAmount,
      proof: convertedProof,
      status: convertedStatus,
      reimbursementType: reimbursementType.name,
      ...otherProps,
    };
  };

  useEffect(() => {
    const init = async () => {
      try {
        const fetchedDetail = await getRequest(URL.Reimbursement.REIMBURSEMENT_DETAIL_URL + id);
        const convertedData = convertData(fetchedDetail);
        setReimbursementData(convertedData);
      } catch (error) {
        history.replace(PATH.Dashboard);
      }

      setIsLoading(false);
    };

    init();
  }, []);

  const renderSpinner = () => (
    <div className='grid' style={{ justifyContent: 'center' }}>
      <MoonLoader color={COLOR.DARK_PURPLE} size={30} />
    </div>
  );

  const renderTable = (data, fields) => (
    <VerticalTable data={data} fields={fields}/>
  );

  const renderCard = () => (
    <Card className="mb-8 shadow-md">
      <CardBody>
        <p className="text-md font-semibold text-gray-500">Request Detail</p>
        <div>{renderTable(reimbursementData, requestFields)}</div>
        <hr className="mt-6 mb-4" style={{ width: '100%' }}></hr>
        <p className="text-md font-semibold text-gray-500">Approval Detail</p>
        <div>{renderTable(reimbursementData, approvalFields)}</div>
        <Button tag={Link} to={PATH.Reimbursement.LIST_REQUEST} layout="outline">
          Back
        </Button>
      </CardBody>
    </Card>
  );

  const renderPage = () => (
    <>
      <div className="mt-8">
        <SectionTitle>Reimbursement Detail</SectionTitle>
      </div>
      {isLoading ? renderSpinner() : renderCard()}
    </>
  );

  return (<>{ isIdValid ? renderPage() : <Redirect to={PATH.Dashboard} />}</>);
};

export default ReimbursementDetail;
