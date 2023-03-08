import React from 'react';

const RupiahCurrency = ({ balance }) => (
  <>
    {new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(balance)}
  </>
);

export default RupiahCurrency;
