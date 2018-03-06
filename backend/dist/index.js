"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const middleware_1 = require("./middleware");
const routes_1 = require("./routes");
const app = new Koa();
app
    .use(middleware_1.default())
    .use(routes_1.default())
    .use(async (ctx) => ctx.body = 'Hello World');
app.listen(parseInt(process.env.PORT, 10) || 3000);
//# sourceMappingURL=index.js.map