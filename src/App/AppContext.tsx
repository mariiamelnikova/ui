import { createContext } from 'react';

import { FormError } from '../components/Login/Login';

export interface AppProps {
  error?: FormError;
  // logoUrl: string;
  user?: User;
  scope: string;
  // showLoginModal: boolean;
  //   isUserLoggedIn: boolean;
  packages: any[];
}

export interface User {
  username: string;
}

export interface AppContextProps {
  state: AppProps;
  setUser: (user: User) => void;
}

const AppContext = createContext<Partial<AppProps>>({});

export default AppContext;
