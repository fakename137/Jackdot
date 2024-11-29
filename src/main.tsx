import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './global.css';
import './index.css';

import WebApp from '@twa-dev/sdk';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './App.tsx';
import Pool from './pages/poolpage/Pool.tsx';

WebApp.ready();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pool" element={<Pool />} />
        </Routes>
      </div>
    </BrowserRouter>
  </React.StrictMode>
);
