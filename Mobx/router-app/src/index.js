import ReactDOM from 'react-dom';
//import promiseFinally from 'promise.prototype.finally';
import React from 'react';
import { HashRouter,BrowserRouter } from 'react-router-dom';

import { Provider } from 'mobx-react';

import App from './App/components/App';

import testStore from './App/stores/testStore';
import commonStore from './App/stores/commonStore';

const stores = {
  testStore,
  commonStore
};

// For easier debugging
window._____APP_STATE_____ = stores;

//promiseFinally.shim();
//useStrict(true);

ReactDOM.render((
  <Provider {...stores}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
), document.getElementById('root'));
