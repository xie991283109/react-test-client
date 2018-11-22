import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, HashRouter, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';

import Regist from './containers/regist/regist';
import Login from './containers/login/login';
import Main from './containers/main/main';
import store from './redux/store';
import './assets/css/index.less';

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <Switch>
                <Route path='/regist' component={Regist}></Route>
                <Route path='/login' component={Login}></Route>
                <Route component={Main}></Route> {/* 默认组件 */}
            </Switch>
        </HashRouter>
    </Provider>,
    document.getElementById('root')
);