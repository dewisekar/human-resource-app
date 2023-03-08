import React from 'react';
import { Badge } from '@windmill/react-ui';

const TableBadge = ({ enumType, content, additionalClass }) => (
  <Badge type={enumType[content]} className={['px-5 py-1', additionalClass]} style={{ fontSize: '14px' }}>{content}</Badge>
);

export default TableBadge;
