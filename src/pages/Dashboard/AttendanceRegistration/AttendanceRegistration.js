import React, { useState, useEffect } from 'react';
import { Card, CardBody } from '@windmill/react-ui';
import DataTable from 'react-data-table-component';

import utils from '../../../utils';
import { WarningCircleIcon } from '../../../icons';
import constants from '../../../constants';
import Spinner from '../../../components/Spinner/Spinner';

const { getRequest } = utils;
const { URL } = constants;
const columns = [{ name: 'Name', selector: (row) => row.name, sortable: true }];

const AttendanceRegistration = () => {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const fetchedData = await getRequest(URL.Attendance.UNREGISTERED_USER);
      setEmployees(fetchedData);
      setIsLoading(false);
    };

    init();
  }, []);

  const renderEmployees = () => (
    <div className="grid grid-cols-12 gap-2 mt-1 mb-5">
      <div className="col-span-12">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <WarningCircleIcon className='w-10 h-10 mr-2'/>
          <p className="text-md font-semibold text-gray">Attendance Registration</p>
        </div>
        <p style={{ textAlign: 'center' }}><small>Berikut ini adalah karyawan aktif yang pin mesin fingerprintnya belum tersimpan
            pada HRIS</small></p>
        <div className="col-span-12 mt-5" style={{ maxHeight: '250px', overflowY: 'auto' }}>
          <DataTable
            columns={columns}
            data={employees}
            dense
          />
        </div>
      </div>
    </div>
  );

  const renderCard = () => (
    <Card className="mb-8 shadow-md">
      <CardBody className="pt-6 pb-6 pl-10 pr-10">
        {renderEmployees()}
      </CardBody>
    </Card>
  );

  return (
    <>
      {isLoading ? <Spinner/> : renderCard()}
    </>
  );
};

export default AttendanceRegistration;
