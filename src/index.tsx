import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import "./index.scss";
import App from './App';
import Vendors from './Vendors';

const root = ReactDOM.createRoot(document.getElementById("root")!); //ReactDOM.createRoot(document.getElementById("root") as Element);
root.render(
  <React.StrictMode>
    <Vendors/>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();