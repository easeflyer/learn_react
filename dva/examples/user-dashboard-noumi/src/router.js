/**
 * 注意 PropTypes 已经弃用 15.5 之后，请用下面的方式替换。
 * import React, { PropTypes } from 'react';
 * 替换为：import PropTypes from 'prop-types';
 */


import React, { PropTypes } from 'react';
import { Router, Route } from 'dva/router';
import Users from './routes/Users';

export default function({ history }) {
  return (
    <Router history={history}>
      <Route path="/users" component={Users} />
    </Router>
  );
};