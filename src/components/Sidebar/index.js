import React from 'react';
import DesktopSidebar from './DesktopSidebar/DesktopSidebar';
import MobileSidebar from './MobileSidebar/MobileSidebar';

function Sidebar() {
  return (
    <>
      <DesktopSidebar />
      <MobileSidebar />
    </>
  );
}

export default Sidebar;
