import React from 'react';
import Select from 'react-select';

import TableBadge from '../TableBadge/TableBadge';

const TaskDetail = ({ data, onStatusChange }) => {
  const StatusEnum = {
    'Not Started': 'danger',
    'On Progress': 'warning',
    Done: 'success',
  };

  const StatusOptions = {
    'Not Started': [{ value: 'On Progress', label: '-> On Progress' }],
    'On Progress': [{ value: 'Done', label: '-> Done' }],
  };

  const {
    realStatus, id, name, priority, startDate, endDate, detail, type,
  } = data;
  const isOnGoing = realStatus !== 'Done';

  const handleStatusChange = (value) => {
    const payload = { id, status: value };
    onStatusChange(payload);
  };

  return (
    <div className='p-2'>
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-7">
          <div className=''>
            <p className="text-lg mb-1 font-semibold text-gray-400" style={{ fontSize: '11px' }}>Task Name</p>
            <p className="text-md font-semibold text-gray" style={{ fontSize: '14px' }}>{name}</p>
          </div>
          <div className='mt-2'>
            <p className="text-lg mb-1 font-semibold text-gray-400" style={{ fontSize: '11px' }}>Detail</p>
            <p className="text-md font-semibold text-gray" style={{ fontSize: '14px' }}><pre style={{ fontFamily: 'inherit ', whiteSpace: 'initial' }}>{detail}</pre></p>
          </div>
        </div>
        <div className="col-span-2">
          <div className=''>
            <p className="text-lg mb-1 font-semibold text-gray-400" style={{ fontSize: '11px' }}>Start Date</p>
            <p className="text-md font-semibold text-gray" style={{ fontSize: '14px' }}>{startDate}</p>
          </div>
          <div className='mt-2'>
            <p className="text-lg mb-1 font-semibold text-gray-400" style={{ fontSize: '11px' }}>Deadline</p>
            <p className="text-md font-semibold text-gray" style={{ fontSize: '14px' }}>{endDate}</p>
          </div>
          <div className='mt-2'>
            <p className="text-lg mb-1 font-semibold text-gray-400" style={{ fontSize: '11px' }}>Type</p>
            <p className="text-md font-semibold text-gray" style={{ fontSize: '14px' }}>{type}</p>
          </div>
          <div className='mt-2'>
            <p className="text-lg mb-1 font-semibold text-gray-400" style={{ fontSize: '11px' }}>Priority</p>
            <p className="text-md font-semibold text-gray" style={{ fontSize: '14px' }}>{priority}</p>
          </div>
        </div>
        <div className="col-span-3">
          <div className=''>
            <p className="text-lg mb-1 font-semibold text-gray-400" style={{ fontSize: '11px' }}>Status</p>
            <TableBadge enumType={StatusEnum} content={realStatus}/>
          </div>
          <div className='mt-2'>
            <p className="text-lg mb-1 font-semibold text-gray-400" style={{ fontSize: '11px' }}>Action</p>
            {isOnGoing && <Select
              defaultValue={{ value: realStatus, label: realStatus }}
              options = {StatusOptions[realStatus]}
              onChange={(event) => handleStatusChange(event.value)}
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  borderColor: '#e2e8f0',
                  boxShadow: 'none',
                  '&:hover': { border: '2px solid rgba(221,121,115, 0.4)' },
                }),
                option: (provided, state) => ({
                  ...provided,
                  backgroundColor: state.isFocused ? '#e2e8f0' : 'white',
                  color: 'black',
                }),
              }}/>}

          </div>
        </div>
      </div>
      <hr className='mt-5'></hr>
    </div>
  );
};

export default TaskDetail;
