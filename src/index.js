import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { HistoryProvider } from './components/providers/HistoryProvider';
 
ReactDOM.render(
    <HistoryProvider>
        <App />
    </HistoryProvider>,
    document.getElementById('root'));