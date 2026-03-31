import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './Store/store.js'
import { BrowserRouter } from 'react-router-dom'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://green-basket-grocery-project-1.onrender.com';
setInterval(() => fetch(`${BASE_URL}/ping`).catch(() => {}), 5 * 60 * 1000);


ReactDOM.createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
)
