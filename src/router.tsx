/* eslint  react/jsx-max-depth:0 */

import React, { Component, ReactElement } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import AppContext from './App/AppContext';
import Header from './components/Header';

const history = createBrowserHistory({
  basename: window.__VERDACCIO_BASENAME_UI_OPTIONS && window.__VERDACCIO_BASENAME_UI_OPTIONS.url_prefix,
});

const NotFound = React.lazy(() => import('./components/NotFound'));
const VersionContextProvider = React.lazy(() => import('./pages/Version/VersionContextProvider'));
const VersionPackage = React.lazy(() => import('./pages/Version'));
const HomePage = React.lazy(() => import('./pages/home'));

interface RouterAppProps {
  onLogout: () => void;
  onToggleLoginModal: () => void;
}

/* eslint-disable react/destructuring-assignment */
class RouterApp extends Component<RouterAppProps> {
  public render(): ReactElement<HTMLDivElement> {
    return (
      <Router history={history}>
        <React.Suspense fallback={null}>
          {this.props.children}
          <Switch>
            <Route exact={true} path={'/'} render={this.renderHomePage} />
            <Route exact={true} path={'/-/web/detail/@:scope/:package'} render={this.renderVersionPage} />
            <Route exact={true} path={'/-/web/detail/:package'} render={this.renderVersionPage} />
            <Route exact={true} path={'/-/web/detail/:package/v/:version'} render={this.renderVersionPage} />
            <Route exact={true} path={'/-/web/detail/@:scope/:package/v/:version'} render={this.renderVersionPage} />
            <Route component={NotFound} />
          </Switch>
        </React.Suspense>
      </Router>
    );
  }

  public renderHomePage = (): ReactElement<HTMLDivElement> => {
    return (
      <AppContext.Consumer>
        {function renderConsumerVersionPage({ isUserLoggedIn, packages }) {
          return <span>home</span>;
        }}
      </AppContext.Consumer>
    );
  };

  public renderVersionPage = (): ReactElement<HTMLDivElement> => {
    return (
      <VersionContextProvider>
        <VersionPackage />
      </VersionContextProvider>
    );
  };
}

export default RouterApp;
