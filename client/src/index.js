import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Router1 from './Router';
import Login from '../src/components/loginForm';

ReactDOM.render(
  <React.StrictMode>
    <Router1 />
  </React.StrictMode>,
  document.getElementById('root')
);


serviceWorker.register();