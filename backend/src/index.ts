
import Koa = require('koa');

import middleware from './middleware';

const app = new Koa();

app
    .use(middleware())
    .use(async ctx => ctx.body = 'Hello World');

app.listen(3000);
