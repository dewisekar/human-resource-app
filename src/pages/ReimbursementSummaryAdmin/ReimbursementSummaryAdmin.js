import React, { useState, useEffect, useMemo } from 'react';
import {
  Card, CardBody, Button, Input,
} from '@windmill/react-ui';
import MoonLoader from 'react-spinners/MoonLoader';
import DataTable from 'react-data-table-component';
import Select from 'react-select';

import SectionTitle from '../../components/Typography/SectionTitle';
import DatatableFilter from '../../components/Datatable/DatatableFilter/DatatableFilter';
import MonthYearFilter from '../../components/Datatable/MonthYearFilter/MonthYearFilter';
import constants from '../../constants';
import utils from '../../utils';
import config from './ReimbursementSummaryAdmin.config';
import * as Icons from '../../icons';

const { SearchIcon } = Icons;
const {
  COLOR, URL, PATH, RequestStatus, AdditionalClasses,
} = constants;
const { getRequest, getRupiahString } = utils;
const { columns } = config;

const ReimbursementSummaryAdmin = () => {
  const [reimbursementData, setReimbursementData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    const init = async () => {
      const fetchedData = await getRequest(URL.Reimbursement.REIMBURSEMENT_ADMIN_URL);
      const approvedData = fetchedData.filter((item) => item.status === RequestStatus.APPROVED);
      const mappedData = approvedData.map((item) => {
        const {
          id, createdAt, name, status, requesterName, approvalDate, approvedAmount,
        } = item;
        const newDate = new Date(createdAt);
        const newApprovalDate = new Date(approvalDate);
        const linkName = <a href={`${PATH.Reimbursement.APPROVAL}?id=${id}`} style={{ textDecoration: 'underline' }}>{requesterName}</a>;
        return {
          name,
          status,
          createdAt: newDate.toLocaleDateString('id-ID'),
          requesterName: linkName,
          approvedDate: newApprovalDate.toLocaleDateString('id-ID'),
          approvedAmount: getRupiahString(approvedAmount),
        };
      });

      setReimbursementData(mappedData);
      setIsLoading(false);
    };

    init();
  }, []);

  const onSearch = (data) => {
    setFilterText(data);
  };

  const filteredItems = reimbursementData.filter(
    (item) => (item.approvedDate.toLowerCase().includes(filterText)),
  );

  const renderSpinner = () => (
      <div className='grid' style={{ justifyContent: 'center' }}>
        <MoonLoader color={COLOR.DARK_PURPLE} size={30} />
      </div>
  );

  const renderCard = () => (
      <Card className="mb-8 shadow-md data-table">
        <CardBody style={{ minHeight: '300px' }}>
          <MonthYearFilter buttonColor={COLOR.LIGHT_PURPLE} onSubmit={onSearch}/>
          <DataTable
            columns={columns}
            data={filteredItems}
            defaultSortFieldId={3}
            defaultSortAsc={false}
            dense
          />
        </CardBody>
      </Card>
  );

  return (
    <>
      <div className="mt-8">
        <SectionTitle>Reimbursement Summary</SectionTitle>
      </div>
      {isLoading ? renderSpinner() : renderCard()}
    </>
  );
};

export default ReimbursementSummaryAdmin;
