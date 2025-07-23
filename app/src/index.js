//2
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';//import index.css shld be in same directry for styling
import App from './App';//import app.js shld be in same directry

const root = ReactDOM.createRoot(document.getElementById('root'));//finds html element with id root (DOM-document object model)
root.render(
  <React.StrictMode>
    <App /> 
  </React.StrictMode>
);//calls the app function located in app.js