import React from 'react';

const DateRangeFilter = ({
  dateValue, onFilter, size, errorMessage = null,
}) => {
  const onFormChange = (event) => {
    const { name, value } = event.target;
    onFilter({ ...dateValue, [name]: value === '' ? null : value });
  };

  return (
    <>
      <div className="relative text-gray-500 grid grid-cols-12 gap-1" style={{ width: size }}>
        <div className='col-span-6'>
          <small>Start Date</small>
        </div>
        <div className='col-span-6'>
          <small>End Date</small>
        </div>
        {errorMessage && <div className="col-span-12">
          <small className='text-red-600'>{errorMessage}</small>
        </div>}
        <div className="col-span-6">
          <input
            className="block w-full pr-20 mt-0  text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
            placeholder="Search..."
            value={dateValue.startDate}
            onChange={onFormChange}
            type="date"
            name="startDate"
          />
        </div>
        <div className="col-span-6">
          <input
            className="block w-full pr-20 mt-0 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
            placeholder="Search..."
            value={dateValue.endDate}
            onChange={onFormChange}
            type="date"
            name="endDate"
          />
        </div>
      </div>
    </>
  );
};

export default DateRangeFilter;
