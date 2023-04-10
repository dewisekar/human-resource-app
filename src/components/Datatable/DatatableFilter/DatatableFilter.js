import React from 'react';

import * as Icons from '../../../icons';

const { CrossIcon } = Icons;

const DatatableFilter = ({
  filterText, onFilter, onClear, size, buttonColor,
}) => (
  <>
    <div className="relative text-gray-500 focus-within:" style={{ width: size }}>
      <input
        className="block w-full pr-20 mt-0 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
        placeholder="Search..."
        value={filterText}
        onChange={onFilter}
        style={{ height: '41px' }}
      />
      <button
        className="absolute inset-y-0 right-0 px-4 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-r-md active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
        onClick={onClear} style={{ backgroundColor: buttonColor }}>
        <CrossIcon/>
      </button>
    </div>
  </>
);

export default DatatableFilter;
