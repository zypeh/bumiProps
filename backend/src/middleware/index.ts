
/// Why am I doing so ?
/// https://stackoverflow.com/questions/29596714/new-es6-syntax-for-importing-commonjs-amd-modules-i-e-import-foo-require/29598404#29598404
/// TL;DR: ```import * as foo from 'foo'``` imports all the properties of the module 'foo', it does not import the default value as foo
import body = require('koa-better-body');
import compose = require('koa-compose');
import convert = require('koa-convert');
import cors = require('@koa/cors');

import passport = require('koa-passport');
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';

import { JwtSecret } from '../config';

export default () => compose([
    error,
    cors(),
    convert(body({
        fields: 'body',
        textLimit: '300kb'
    })),
    passport.initialize()
])

async function error(ctx, next) {
    try {
        await next()
    } catch (err) {
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

passport.use(
    new JwtStrategy(
        {
            secretOrKey: JwtSecret,
            //jwtFromRequest: ExtractJwt.fromUrlQueryParameter('token')
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        },
        async (payload, done) => {
            // deserialize jwt payload
            const user = null //await db.User.findOne({ where: { username: payload.user }})

            if (user)
                done(null, Object.assign({ isToken: !!payload.hb }, user))
            else
                done(null, false)
        }
    )
)
