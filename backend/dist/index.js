"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const app = new Koa();
app.use(async (ctx) => ctx.body = 'Hello World');
app.listen(3000);
//# sourceMappingURL=index.js.map