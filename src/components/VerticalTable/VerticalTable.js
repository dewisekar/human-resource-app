import React from 'react';

import './VerticalTable.css';

const VerticalTable = ({
  data, fields, padding = 'py-2 px-3', column = 1,
}) => {
  const lastIndex = fields.length - 1;

  const renderSingleColumn = (item) => (
    <tr key={item.key}>
      <td className={`${padding} heading`}>{item.label}</td>
      <td className={`${padding} content`}>{data[item.key]}</td>
    </tr>
  );

  const renderDoubleColumn = (item, index) => {
    if (index % 2 === 1) { return <></>; }

    if (index === lastIndex && index % 2 === 0) {
      return (
        <tr key={item.key}>
          <td className={`${padding} heading`} style={{ maxWidth: '250px' }}>{item.label}</td>
          <td className={`${padding} content`}>{data[item.key]}</td>
        </tr>
      );
    }

    return (
      <tr key={item.key}>
        <td className={`${padding} heading`} style={{ maxWidth: '250px' }}>{fields[index].label}</td>
        <td className={`${padding} content`}>{data[fields[index].key]}</td>
        <td className={`${padding} heading`} style={{ maxWidth: '250px' }}>{fields[index + 1].label}</td>
        <td className={`${padding} content`}>{data[fields[index + 1].key]}</td>
      </tr>
    );
  };

  return (
    <table className="my-4">
      {column === 1 && fields.map((item) => renderSingleColumn(item))}
      {column === 2 && fields.map((item, index) => renderDoubleColumn(item, index))}
    </table>
  );
};

export default VerticalTable;
