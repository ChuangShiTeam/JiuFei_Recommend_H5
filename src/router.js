import React from 'react';
import {Router, Route, IndexRedirect} from 'dva/router';
import Home from './view/Home';
import Product from './view/Product';

function RouterConfig({history}) {

    return (
        <Router history={history}>
            <Route path="/">
                <IndexRedirect to="home"/>
                <Route path="home" component={Home}/>
                <Route path="product" component={Product}/>
            </Route>
        </Router>
    );
}

export default RouterConfig;
