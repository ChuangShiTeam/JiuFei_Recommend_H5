import dva from 'dva';
import Router from './router';

import product from './model/product';

const app = dva();

app.model(product);

app.router(Router);

document.getElementById("loading").remove();

app.start('#root');