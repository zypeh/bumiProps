
import Koa = require('koa');

import middleware from './middleware';
import routes from './routes';

const app = new Koa();

app
    .use(middleware())
    .use(routes())
    .use(async ctx => ctx.body = 'Hello World');

app.listen(parseInt(process.env.PORT, 10) || 3000);
