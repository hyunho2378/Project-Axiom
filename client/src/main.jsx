import React from 'react';
import ReactDOM from 'react-dom/client';
// CRITICAL FIX: App is located in pages folder
import App from './pages/App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
