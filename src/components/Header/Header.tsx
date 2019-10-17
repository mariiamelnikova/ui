import React, { useState, useContext } from 'react';

import Search from '../Search';
import { getRegistryURL } from '../../utils/url';
import Button from '../../muiComponents/Button';
import AppContext from '../../App/AppContext';

import { NavBar, InnerNavBar, MobileNavBar, InnerMobileNavBar } from './styles';
import HeaderLeft from './HeaderLeft';
import HeaderRight from './HeaderRight';
import HeaderInfoDialog from './HeaderInfoDialog';

interface Props {
  // logo?: string;
  // username?: string;
  // onLogout: () => void;
  // onToggleLoginModal: () => void;
  // scope: string;
  withoutSearch?: boolean;
}

/* eslint-disable react/jsx-max-depth */
/* eslint-disable react/jsx-no-bind*/
const Header: React.FC<Props> = ({ withoutSearch }) => {
  const appContext = useContext(AppContext);

  const { user, scope } = appContext;
  const logo = window.VERDACCIO_LOGO;
  const [isInfoDialogOpen, setOpenInfoDialog] = useState();
  const [showMobileNavBar, setShowMobileNavBar] = useState();

  return (
    <>
      <NavBar position="static">
        <InnerNavBar>
          <HeaderLeft logo={logo} />
          <HeaderRight
            onLogout={() => console.log('logout')}
            onOpenRegistryInfoDialog={() => setOpenInfoDialog(true)}
            onToggleLogin={() => console.log('login modal')}
            onToggleMobileNav={() => setShowMobileNavBar(!showMobileNavBar)}
            username={user && user.username}
            withoutSearch={withoutSearch}
          />
        </InnerNavBar>
        {scope && <HeaderInfoDialog isOpen={isInfoDialogOpen} onCloseDialog={() => setOpenInfoDialog(false)} registryUrl={getRegistryURL()} scope={scope} />}
      </NavBar>
      {showMobileNavBar && !withoutSearch && (
        <MobileNavBar>
          <InnerMobileNavBar>
            <Search />
          </InnerMobileNavBar>
          <Button color="inherit">{'Cancel'}</Button>
        </MobileNavBar>
      )}
    </>
  );
};

export default Header;
