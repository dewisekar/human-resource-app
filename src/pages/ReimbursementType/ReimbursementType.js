import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardBody, Button } from '@windmill/react-ui';
import MoonLoader from 'react-spinners/MoonLoader';
import DataTable from 'react-data-table-component';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import SectionTitle from '../../components/Typography/SectionTitle';
import DatatableFilter from '../../components/Datatable/DatatableFilter/DatatableFilter';
import FormModal from '../../components/FormModal/FormModal';
import AlertModal from '../../components/AlertModal/AlertModal';
import SessionExpiredModal from '../../components/SessionExpiredModal/SessionExpiredModal';
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal';
import TextInput from '../../components/Input/TextInput/TextInput';
import constants from '../../constants';
import utils from '../../utils';
import config from './ReimbursementType.config';
import handlers from './ReimbursementType.handlers';
import * as Icons from '../../icons';

const { EditIcon, PlusCircleIcon, CrossIcon } = Icons;
const { COLOR, URL } = constants;
const { getRequest } = utils;
const { columns, inputField } = config;
const { saveReimbursementTypeHandler, deleteReimbursementTypeHandler } = handlers;

const ReimbursementType = () => {
  const history = useHistory();
  const [reimbursementTypeData, setReimbursementTypeData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterText, setFilterText] = useState('');
  const [isFormModalShown, setIsFormModalShown] = useState(false);
  const [modalTitle, setModalTitle] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const [isAlertModalShown, setIsAlertModalShown] = useState(false);
  const [chosenReimbursementTypeId, setChosenReimbursementTypeId] = useState(null);
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [isSessionExpiredModalShown, setIsSessionExpiredModalShown] = useState(false);
  const [isConfirmationModalShown, setIsConfirmationModalShown] = useState(false);
  const {
    register, handleSubmit, formState: { errors }, control, setValue, clearErrors,
  } = useForm();
  const useFormConfig = {
    register, control, errors, ...inputField,
  };

  const showExpiredModal = () => setIsSessionExpiredModalShown(true);

  const showAlert = () => setIsAlertModalShown(true);

  const closeAlert = () => {
    setIsConfirmationModalShown(false);
    setIsAlertModalShown(false);
    window.location.reload();
  };

  const onClickEditReimbursementType = (id, name) => {
    clearErrors();
    setChosenReimbursementTypeId(id);
    setIsFormModalShown(true);
    setValue('name', name);
    setModalTitle('Edit Reimbursement Type');
  };

  const onClickAddReimbursementType = () => {
    setChosenReimbursementTypeId(null);
    setIsFormModalShown(true);
    setValue('name', null);
    setModalTitle('Add Reimbursement Type');
  };

  const onDelete = (id) => {
    setAlertMessage('Are you sure you want to delete this reimbursementType?');
    setChosenReimbursementTypeId(id);
    setIsConfirmationModalShown(true);
  };

  const renderActionButton = (id, name) => (
    <>
      <Button className="my-1" size="small" onClick={() => onClickEditReimbursementType(id, name)} style={{ backgroundColor: COLOR.DARK_PURPLE }}>
        <EditIcon className='w-4 h-4 mr-1'/>Edit
      </Button>
      <Button className="my-1 ml-2" size="small" onClick={() => onDelete(id)} style={{ backgroundColor: COLOR.RED }}>
        <CrossIcon className='w-4 h-4 mr-1'/>Delete
      </Button>
    </>
  );

  const onCancelAddUpdate = () => {
    setIsFormModalShown(false);
    setIsConfirmationModalShown(false);
  };

  const onHandleSubmit = async (data) => {
    setIsLoading(true);
    setIsFormModalShown(false);
    const submitHandler = { showAlert, setAlertMessage, showExpiredModal };
    await saveReimbursementTypeHandler(chosenReimbursementTypeId, data, submitHandler);
    setIsLoading(false);
  };

  const onHandleDelete = async () => {
    setIsLoading(true);
    setIsConfirmationModalShown(false);
    const submitHandler = { showAlert, setAlertMessage, showExpiredModal };
    await deleteReimbursementTypeHandler(chosenReimbursementTypeId, submitHandler);
    setIsLoading(false);
  };

  useEffect(() => {
    const init = async () => {
      const fetchedData = await getRequest(URL.Reimbursement.TYPE_URL);
      const mappedData = fetchedData.map((item) => {
        const { name, id } = item;
        const action = renderActionButton(id, name);
        return { name, action };
      });

      setReimbursementTypeData(mappedData);
      setIsLoading(false);
    };

    init();
  }, []);

  const filteredItems = reimbursementTypeData.filter(
    (item) => {
      const { action, ...otherItem } = item;
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
        buttonColor={COLOR.DARK_PURPLE}
        size="100%"
      />
    );
  }, [filterText, resetPaginationToggle]);

  const renderSpinner = () => (
    <div className='grid' style={{ justifyContent: 'center' }}>
      <MoonLoader color={COLOR.DARK_PURPLE} size={30} />
    </div>
  );

  const renderForm = () => <form><TextInput {...useFormConfig}/></form>;

  const renderCard = () => (
    <Card className="mb-8 shadow-md data-table">
      <CardBody>
        <Button onClick={onClickAddReimbursementType} size="small" className="mb-1" style={{ backgroundColor: COLOR.DARK_PURPLE }}>
          <PlusCircleIcon className='w-4 h-4 mr-1'/>Add Reimbursement Type
        </Button>
        <DataTable
          columns={columns}
          data={filteredItems}
          pagination
          subHeader
          subHeaderComponent={subHeaderComponent}
          defaultSortFieldId={1}
          dense
        />
      </CardBody>
    </Card>
  );

  return (
    <>
      <div className="mt-8">
        <SectionTitle>Reimbursement Type List</SectionTitle>
      </div>
      {isFormModalShown && <FormModal content={renderForm()} onClose={onCancelAddUpdate}
        onConfirm={handleSubmit(onHandleSubmit)} title={modalTitle} />}
      {isSessionExpiredModalShown
        && <SessionExpiredModal history={history}/>}
      {isAlertModalShown
        && <AlertModal message={alertMessage} onClose={closeAlert}/>}
      {isConfirmationModalShown && <ConfirmationModal
        message={alertMessage} onClose={onCancelAddUpdate} onConfirm={onHandleDelete}/>}
      {isLoading ? renderSpinner() : renderCard()}
    </>
  );
};

export default ReimbursementType;
