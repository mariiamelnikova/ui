import React, { useState, useEffect } from 'react';
import isPropValid from '@emotion/is-prop-valid';
import styled from 'react-emotion';
import Box from '@material-ui/core/Box';
import isNil from 'lodash/isNil';
import { Router } from 'react-router-dom';

import storage from '../utils/storage';
import { makeLogin, isTokenExpire } from '../utils/login';
import API from '../utils/api';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import StyleBaseline from '../design-tokens/StyleBaseline';

import AppContext from './AppContext';
import AppRoute, { history } from './AppRoute';

const StyledBoxContainer = styled(Box, { shouldForwardProp: isPropValid })({
  overflow: 'hidden',
});

/* eslint-disable react/jsx-max-depth */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/jsx-no-bind */
const App: React.FC = () => {
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
    <StyleBaseline>
      <Box display="flex" flexDirection="column" height="100%">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <Router history={history}>
              <AppContext.Provider value={{ packages, user, scope }}>
                <Header />
                <AppRoute />
              </AppContext.Provider>
            </Router>
            <Footer />
          </>
        )}
      </Box>
    </StyleBaseline>
  );
};

export default App;
