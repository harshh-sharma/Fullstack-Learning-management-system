import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import appStore from './redux/Store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={appStore}>
    <BrowserRouter>
      <App />
      <Toaster />
    </BrowserRouter>
  </Provider>
);
