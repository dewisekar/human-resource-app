import React from 'react';
import MoonLoader from 'react-spinners/MoonLoader';

import constants from '../../constants';

const { COLOR } = constants;

const Spinner = ({ color = COLOR.BLUE }) => (
  <div className='grid' style={{ justifyContent: 'center', marginBottom: '10px' }}>
    <MoonLoader color={color} size={30} />
  </div>
);

export default Spinner;
