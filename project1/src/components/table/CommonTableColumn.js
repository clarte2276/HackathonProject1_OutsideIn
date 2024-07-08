import React from 'react';

const CommonTableColumn = ({ children, isTitleColumn }) => {
  return <td className={`common-table-column ${isTitleColumn ? 'title-column' : ''}`}>{children}</td>;
};

export default CommonTableColumn;
