import React, { useContext, useState } from 'react';
import {
  Avatar, Dropdown, DropdownItem,
} from '@windmill/react-ui';
import { useHistory } from 'react-router-dom';

import { SidebarContext } from '../context/SidebarContext';
import { MenuIcon, OutlineLogoutIcon } from '../icons';
import Images from '../assets/images';
import StorageUtil from '../utils/StorageUtil';
import constants from '../constants';

const { clearAllKey } = StorageUtil;
const { PATH } = constants;

const Header = () => {
  const history = useHistory();
  const { toggleSidebar } = useContext(SidebarContext);

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const handleProfileClick = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const logOut = () => {
    clearAllKey();
    history.push(PATH.Login);
  };

  return (
    <header className="z-40 py-4 bg-white shadow-bottom dark:bg-gray-800">
      <div className="container flex lg:flex-row-reverse items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300">
        <button
          className="p-1 mr-5 -ml-1 rounded-md lg:hidden focus:outline-none focus:shadow-outline-purple"
          onClick={toggleSidebar}
          aria-label="Menu"
        >
          <MenuIcon className="w-6 h-6" aria-hidden="true" />
        </button>

        <ul className="flex items-center flex-shrink-0 space-x-6">
          <li className="relative">
            <button
              className="rounded-full focus:shadow-outline-purple focus:outline-none"
              onClick={handleProfileClick}
              aria-label="Account"
              aria-haspopup="true"
            >
              <Avatar
                className="align-middle"
                src={Images.JIERA_LOGO}
                alt=""
                aria-hidden="true"
              />
            </button>
            <Dropdown
              align="right"
              isOpen={isProfileMenuOpen}
              onClose={() => setIsProfileMenuOpen(false)}
            >
              <DropdownItem tag="a" onClick={logOut}>
                <OutlineLogoutIcon className="w-4 h-4 mr-3" aria-hidden="true" />
                <span>Log out</span>
              </DropdownItem>
            </Dropdown>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
