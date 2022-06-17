import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { DealProvider } from './context/DealContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <DealProvider>
        <App />
    </DealProvider>
);
