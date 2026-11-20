import React from 'react'
import ReactDOM from 'react-dom/client'
import Aplicacion from './App.jsx'
import PaginaNosotros from './Nosotros.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const pagina = window.location.pathname.replace(/\/+$/, '') === '/nosotros'
  ? <PaginaNosotros />
  : <Aplicacion />;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {pagina}
  </React.StrictMode>,
)
