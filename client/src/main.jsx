import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Provider } from 'react-redux'
import Store from './redux/Store'
import { Toaster } from 'react-hot-toast'
import './main.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={Store}>
    <Toaster position='top-center'></Toaster>
    <App />
    </Provider>
  </React.StrictMode>,
)
