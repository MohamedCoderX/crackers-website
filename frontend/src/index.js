import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import store from '../src/components/store'
import {Provider} from 'react-redux'
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  
  <Provider store={store}>
  <App />
  </Provider>
  
  
);


