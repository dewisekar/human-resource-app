import React from 'react';

import './VerticalTable.css';

const VerticalTable = ({ data, fields }) => {
  const renderRows = (item) => (
    <tr key={item.key}>
      <td className="py-2 px-3 heading">{item.label}</td>
      <td className="py-2 px-3 content">{data[item.key]}</td>
    </tr>
  );

  return (
      <table className="my-4">
        {fields.map((item) => renderRows(item))}
      </table>
  );
};

export default VerticalTable;
