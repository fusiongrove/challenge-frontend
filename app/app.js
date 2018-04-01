import React from 'react';
import ReactDOM from 'react-dom';
import {browserHistory} from 'react-router';

import Router from './routes';
import './assets/scss/index.scss';

global._config = require('./config/app.config.json');
global.helpers = require('./helpers');

ReactDOM.render(
  <Router history={browserHistory}/>,
  document.getElementById('app'),
);

