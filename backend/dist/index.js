"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const middleware_1 = require("./middleware");
const app = new Koa();
app
    .use(middleware_1.default())
    .use(async (ctx) => ctx.body = 'Hello World');
app.listen(3000);
//# sourceMappingURL=index.js.map