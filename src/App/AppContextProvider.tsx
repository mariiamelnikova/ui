import React, { useState } from 'react';

import AppContext, { AppProps, User } from './AppContext';

/* eslint-disable @typescript-eslint/explicit-function-return-type */
const AppContextProvider: React.FC = ({ children }) => {
  const [state, setState] = useState<AppProps>({
    logoUrl: '',
    scope: '',
    showLoginModal: false,
    //   isUserLoggedIn: boolean;
    packages: [],
    isLoading: false,
  });

  const setUser = (user: User) => {
    setState({
      ...state,
      user,
    });
  };

  return (
    <AppContext.Provider
      value={{
        state,
        setUser,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
