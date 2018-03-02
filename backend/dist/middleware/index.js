"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// Why am I doing so ?
/// https://stackoverflow.com/questions/29596714/new-es6-syntax-for-importing-commonjs-amd-modules-i-e-import-foo-require/29598404#29598404
/// TL;DR: ```import * as foo from 'foo'``` imports all the properties of the module 'foo', it does not import the default value as foo
const body = require("koa-better-body");
const compose = require("koa-compose");
const convert = require("koa-convert");
const cors = require("@koa/cors");
exports.default = () => compose([
    error,
    cors(),
    convert(body({
        fields: 'body',
        textLimit: '300kb'
    })),
]);
async function error(ctx, next) {
    try {
        await next();
    }
    catch (err) {
        ctx.status = err.status || 500;
        ctx.body = {
            success: false,
            message: err.message || 'Internal Error'
        };
        if (ctx.status == 500) {
            ctx.app.emit('error', err, ctx);
        }
    }
}
//# sourceMappingURL=index.js.map