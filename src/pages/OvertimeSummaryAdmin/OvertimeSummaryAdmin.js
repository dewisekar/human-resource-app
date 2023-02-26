import React, { useState, useEffect } from 'react';
import {
  Card, CardBody,
} from '@windmill/react-ui';
import MoonLoader from 'react-spinners/MoonLoader';
import DataTable from 'react-data-table-component';

import SectionTitle from '../../components/Typography/SectionTitle';
import EmployeeMonthYearFiilter from '../../components/Datatable/EmployeeMonthYearFiilter/EmployeeMonthYearFiilter';
import constants from '../../constants';
import utils from '../../utils';
import config from './OvertimeSummaryAdmin.config';

const {
  COLOR, URL, PATH, RequestStatus,
} = constants;
const { getRequest } = utils;
const { columns } = config;

const OvertimeSummaryAdmin = () => {
  const [overtimeData, setOvertimeData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterText, setFilterText] = useState({ employee: '', date: '' });

  useEffect(() => {
    const init = async () => {
      const fetchedData = await getRequest(URL.Overtime.OVERTIME_ADMIN_URL);
      const approvedRequest = fetchedData.filter((item) => item.status === RequestStatus.APPROVED);
      const mappedData = approvedRequest.map((item) => {
        const {
          id, requesterName, hours, overtimeDate, approvalDate,
        } = item;
        const linkName = <a href={`${PATH.Overtime.DETAIL}?id=${id}`} style={{ textDecoration: 'underline' }}>{requesterName}</a>;
        const newOvertimeDate = new Date(overtimeDate).toLocaleDateString('id-ID');
        const newApprovedDate = new Date(approvalDate).toLocaleDateString('id-ID');
        return {
          requesterName: linkName,
          overtimeDate: newOvertimeDate,
          hours: hours.toString(),
          approvedDate: newApprovedDate,
          realRequesterName: requesterName,
          realHours: hours,
        };
      });

      setOvertimeData(mappedData);
      setIsLoading(false);

      setOvertimeData(mappedData);
      setIsLoading(false);
    };

    init();
  }, []);

  const onSearch = (data) => {
    setFilterText(data);
  };

  const filteredItems = overtimeData.filter(
    (item) => (item.approvedDate.toLowerCase().includes(filterText.date)
    && item.realRequesterName.toLowerCase().includes(filterText.employee)),
  );

  const totalApprovedHours = filteredItems
    .reduce((sum, { realHours }) => sum + realHours, 0);

  const renderSpinner = () => (
      <div className='grid' style={{ justifyContent: 'center' }}>
        <MoonLoader color={COLOR.DARK_PURPLE} size={30} />
      </div>
  );

  const renderCard = () => (
      <Card className="mb-8 shadow-md data-table">
        <CardBody style={{ minHeight: '300px' }}>
          <EmployeeMonthYearFiilter buttonColor={COLOR.BLUE} onSubmit={onSearch}/>
          <div className="grid grid-cols-12 gap-5">
            <div className="col-span-12 lg:col-span-9 order-last lg:order-first">
              <DataTable
                columns={columns}
                data={filteredItems}
                defaultSortFieldId={2}
                defaultSortAsc={false}
                dense
              />
            </div>
            <div className='col-span-12 lg:col-span-3 order-first lg:order-last'>
                <b>Summary:</b><br></br>
                Total Overtime: {filteredItems.length}<br></br>
                Total Approved Hours: {totalApprovedHours}
            </div>
          </div>
        </CardBody>
      </Card>
  );

  return (
    <>
      <div className="mt-8">
        <SectionTitle>Approved Overtime Summary</SectionTitle>
      </div>
      {isLoading ? renderSpinner() : renderCard()}
    </>
  );
};

export default OvertimeSummaryAdmin;
