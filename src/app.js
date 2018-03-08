import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './components/App';
import './index.html';


const container = document.getElementById('app-container');

// Render App
ReactDOM.render(
    <BrowserRouter>
        <Provider store={store} >
            <App />
        </Provider>
    </BrowserRouter>,
    container
);


// Hot module reloading
if (module.hot) {
    module.hot.accept('./components/App', () => {
        ReactDOM.render(
            <BrowserRouter>
                <Provider store={store} >
                    <App />
                </Provider>
            </BrowserRouter>,
            container
        );
    });
}
