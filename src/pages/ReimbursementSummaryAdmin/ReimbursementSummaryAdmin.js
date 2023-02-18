import React, { useState, useEffect } from 'react';
import {
  Card, CardBody,
} from '@windmill/react-ui';
import MoonLoader from 'react-spinners/MoonLoader';
import DataTable from 'react-data-table-component';

import SectionTitle from '../../components/Typography/SectionTitle';
import MonthYearFilter from '../../components/Datatable/MonthYearFilter/MonthYearFilter';
import constants from '../../constants';
import utils from '../../utils';
import config from './ReimbursementSummaryAdmin.config';
import RupiahCurrency from '../../components/RupiahCurrency/RupiahCurrency';

const {
  COLOR, URL, PATH, RequestStatus,
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
          id, createdAt, name, requesterName, approvalDate, approvedAmount,
        } = item;
        const newDate = new Date(createdAt);
        const newApprovalDate = new Date(approvalDate);
        const linkName = <a href={`${PATH.Reimbursement.APPROVAL}?id=${id}`} style={{ textDecoration: 'underline' }}>{requesterName}</a>;
        return {
          name,
          createdAt: newDate.toLocaleDateString('id-ID'),
          requesterName: linkName,
          approvedDate: newApprovalDate.toLocaleDateString('id-ID'),
          approvedAmount: getRupiahString(approvedAmount),
          realApprovedAmount: approvedAmount,
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

  const totalApprovedAmount = filteredItems
    .reduce((sum, { realApprovedAmount }) => sum + realApprovedAmount, 0);

  const renderSpinner = () => (
      <div className='grid' style={{ justifyContent: 'center' }}>
        <MoonLoader color={COLOR.DARK_PURPLE} size={30} />
      </div>
  );

  const renderCard = () => (
      <Card className="mb-8 shadow-md data-table">
        <CardBody style={{ minHeight: '300px' }}>
          <MonthYearFilter buttonColor={COLOR.LIGHT_PURPLE} onSubmit={onSearch}/>
          <div className="grid grid-cols-12 gap-5">
            <div className="col-span-12 lg:col-span-9 order-last lg:order-first">
              <DataTable
                columns={columns}
                data={filteredItems}
                defaultSortFieldId={3}
                defaultSortAsc={false}
                dense
              />
            </div>
            <div className='col-span-12 lg:col-span-3 order-first lg:order-last'>
                <b>Summary:</b><br></br>
                Total Reimbursement: {filteredItems.length}<br></br>
                Total Approved Amount: <RupiahCurrency balance={totalApprovedAmount}/>
            </div>
          </div>
        </CardBody>
      </Card>
  );

  return (
    <>
      <div className="mt-8">
        <SectionTitle>Approved Reimbursement Summary</SectionTitle>
      </div>
      {isLoading ? renderSpinner() : renderCard()}
    </>
  );
};

export default ReimbursementSummaryAdmin;
