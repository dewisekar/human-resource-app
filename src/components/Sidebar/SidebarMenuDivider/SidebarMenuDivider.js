import React from 'react';

const SidebarMenuDivider = ({ route }) => (
    <li className='"relative px-6 py-3'><b className='text-grey-900'>{route.name}</b><hr className='mt-2'></hr></li>
);
export default SidebarMenuDivider;
