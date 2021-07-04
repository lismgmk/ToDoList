import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import * as serviceWorker from './serviceWorker';
import AppWithRedux from "./app/AppWithRedux";
import {Provider} from "react-redux";
import {store} from "./app/store";
import App from "./trash/App";
import AppWithReduser from "./trash/AppWithReduser";
import {BrowserRouter} from "react-router-dom";

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <AppWithRedux/>
            {/* <AppWithReduser/>*/}
            {/*<App/>*/}
        </Provider>
    </BrowserRouter>

    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
