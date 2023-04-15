import React, { useState, useEffect } from 'react';
import { Card, CardBody } from '@windmill/react-ui';
import DataTable from 'react-data-table-component';

import utils from '../../../utils';
import { CalendarIcon } from '../../../icons';
import constants from '../../../constants';

const { getRequest } = utils;
const { URL } = constants;
const columns = [
  { name: 'Name', selector: (row) => row.name, sortable: true },
  { name: 'Birthday', selector: (row) => row.birthDate }];

const EmployeeOverview = () => {
  const [birthdays, setBirthdays] = useState([]);
  const thisMonth = new Date().toLocaleDateString('id-ID', { month: 'long' });
  const today = new Date().getDate();

  useEffect(() => {
    const init = async () => {
      const fetchedBirthdays = await getRequest(URL.User.USER_BIRTHDAYS_THIS_MONTH);
      const mappedBirthdays = fetchedBirthdays.map((item) => {
        const { birthDate } = item;
        const isToday = new Date(birthDate).getDate() === today;
        const className = isToday && 'text-red-600';
        const convertedBirthdate = new Date(birthDate).toLocaleDateString('id-ID', { month: 'long', day: '2-digit' });
        return { ...item, birthDate: <p className={className}>{convertedBirthdate}</p> };
      });

      setBirthdays(mappedBirthdays);
    };

    init();
  }, []);

  const renderBirthdays = () => (
    <div className="grid grid-cols-12 gap-2 mt-1 mb-5">
      <div className="col-span-12">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <CalendarIcon className='w-10 h-10 mr-5'/>
          <p className="text-md font-semibold text-gray">Employee Birthdays This Month: {thisMonth}</p>
        </div>
        <div className="col-span-12 mt-5" style={{ maxHeight: '250px', overflowY: 'auto' }}>
          <DataTable
            columns={columns}
            data={birthdays}
            pagination
            dense
            paginationRowsPerPageOptions={[10, 25, 50, 100]}
          />
        </div>
      </div>
    </div>
  );

  const renderCard = () => (
    <Card className="mb-8 shadow-md">
      <CardBody className="pt-6 pb-6 pl-10 pr-10">
        {renderBirthdays()}
      </CardBody>
    </Card>
  );

  return (
    <>
      {renderCard()}
    </>
  );
};

export default EmployeeOverview;
