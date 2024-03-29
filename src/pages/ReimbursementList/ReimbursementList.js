import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardBody, Button } from '@windmill/react-ui';
import MoonLoader from 'react-spinners/MoonLoader';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';

import SectionTitle from '../../components/Typography/SectionTitle';
import DatatableFilter from '../../components/Datatable/DatatableFilter/DatatableFilter';
import TableBadge from '../../components/TableBadge/TableBadge';
import PageUtil from '../../utils/PageUtil';
import constants from '../../constants';
import utils from '../../utils';
import config from './ReimbursementList.config';
import * as Icons from '../../icons';

const { DocumentIcon } = Icons;
const {
  COLOR, URL, PATH, RequestStatusBadgeEnum,
} = constants;
const { getRequest } = utils;
const { columns } = config;

const ReimbursementList = () => {
  const [reimbursementData, setReimbursementData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterText, setFilterText] = useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const renderActionButton = (reimbursementId) => (
    <Button tag={Link} to={`${PATH.Reimbursement.DETAIL}?id=${reimbursementId}`} size="small" style={{ backgroundColor: COLOR.LIGHT_PURPLE }}>
      <DocumentIcon className='w-4 h-4 mr-1'/>Detail
    </Button>
  );

  useEffect(() => {
    const init = async () => {
      const fetchedData = await getRequest(URL.Reimbursement.REIMBURSEMENT_URL);
      const mappedData = fetchedData.map((item) => {
        const {
          id, createdAt, name, status, reimbursementType,
        } = item;
        const newDate = new Date(createdAt);
        const action = renderActionButton(id);
        return {
          name,
          status: <TableBadge enumType={RequestStatusBadgeEnum} content={status}/>,
          realStatus: status,
          action,
          createdAt: newDate.toLocaleDateString('id-ID'),
          reimbursementType: reimbursementType.name,
          realCreatedAt: newDate,
        };
      });

      setReimbursementData(mappedData);
      setIsLoading(false);
    };

    init();
  }, []);

  const filteredItems = reimbursementData.filter(
    (item) => {
      const {
        action, status, realCreatedAt, ...otherItem
      } = item;
      return Object.keys(otherItem).some((key) => otherItem[key]
        .toLowerCase().includes(filterText.toLowerCase()));
    },
  );

  const subHeaderComponent = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText('');
      }
    };

    return (
      <DatatableFilter
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
        buttonColor={COLOR.LIGHT_PURPLE}
        size="100%"
      />
    );
  }, [filterText, resetPaginationToggle]);

  const renderSpinner = () => (
    <div className='grid' style={{ justifyContent: 'center' }}>
      <MoonLoader color={COLOR.DARK_PURPLE} size={30} />
    </div>
  );

  const renderCard = () => (
    <Card className="mb-8 shadow-md data-table">
      <CardBody>
        <DataTable
          columns={columns}
          data={filteredItems}
          pagination
          subHeader
          subHeaderComponent={subHeaderComponent}
          defaultSortFieldId={2}
          defaultSortAsc={false}
          sortFunction={PageUtil.customTableSort}
          paginationRowsPerPageOptions={[10, 25, 50, 100]}
        />
      </CardBody>
    </Card>
  );

  return (
    <>
      <div className="mt-8">
        <SectionTitle>Reimbursement History</SectionTitle>
      </div>
      {isLoading ? renderSpinner() : renderCard()}
    </>
  );
};

export default ReimbursementList;
