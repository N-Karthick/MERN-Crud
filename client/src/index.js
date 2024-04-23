import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import store from './redux/action.js';
import { Provider } from 'react-redux';

const rootElement = document.getElementById('root');

ReactDOM.createRoot(rootElement).render(

  <Provider store={store}>
    <App />
  </Provider>
);
