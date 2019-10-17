import React, { useState, useEffect } from 'react';
import isPropValid from '@emotion/is-prop-valid';
import styled from 'react-emotion';
import Box from '@material-ui/core/Box';
import isNil from 'lodash/isNil';

import storage from '../utils/storage';
import { makeLogin, isTokenExpire } from '../utils/login';
import API from '../utils/api';
import RouterApp from '../router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loading from '../components/Loading';

import AppContext from './AppContext';
// import AppContextProvider from './AppContextProvider';

const StyledBoxContainer = styled(Box, { shouldForwardProp: isPropValid })({
  overflow: 'hidden',
});

// const StyledBoxContext = styled(Box, { shouldForwardProp: isPropValid })`
//   position: 'relative';
//   backgroundcolor: ${props => {
//     console.log(props);
//     return 'blue';
//   }};
// `;

/* eslint-disable @typescript-eslint/explicit-function-return-type*/
/* eslint-disable react/jsx-no-bind*/
/* eslint-disable react/jsx-max-depth */
/* eslint-disable react-hooks/exhaustive-deps */
const AppContent: React.FC = () => {
  const [user, setUser] = useState();
  const [packages, setPackages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [scope, setScope] = useState('');

  /**
   * Logouts user
   * Required by: <Header />
   */
  const logout = () => {
    storage.removeItem('username');
    storage.removeItem('token');
    setUser(undefined);
  };

  const checkUserAlreadyLoggedIn = () => {
    // checks for token validity
    const token = storage.getItem('token');
    const username = storage.getItem('username');

    if (isTokenExpire(token) || isNil(username)) {
      logout();
      return;
    }

    setUser({ username });
  };

  const loadOnHandler = async () => {
    try {
      const packages = await API.request<any[]>('packages', 'GET');
      // @ts-ignore FIXME: Type 'any[]' is not assignable to type 'never[]'.
      setPackages(packages);
    } catch (error) {
      // FIXME: add dialog
      console.error({
        title: 'Warning',
        message: `Unable to load package list: ${error.message}`,
      });
    }

    setIsLoading(false);
  };

  useEffect(() => {
    checkUserAlreadyLoggedIn();
    loadOnHandler();
  }, []);

  return (
    <Box display="flex" flexDirection="column" height="100%">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <AppContext.Provider value={{ packages, user, scope }}>
            <RouterApp onLogout={() => console.log('onLogout')} onToggleLoginModal={() => console.log('okokok')}>
              <Header />
            </RouterApp>
          </AppContext.Provider>
          <Footer />
        </>
      )}
    </Box>
  );
};

export default AppContent;
