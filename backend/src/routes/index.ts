
import Router = require('koa-router');
import compose = require('koa-compose');
import passport = require('koa-passport');

import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa';
import { apolloUploadKoa } from 'apollo-upload-server';
import { schema } from './graphql';

const router = new Router();

/**
 * A custom middleware to generate user profile without throwing errors,
 * in this case, we insert dummy data here because graphiql cannot pass the Authorization headers.
 */
const graphAuth = () => async (ctx, next) => {
    await passport.authenticate('jwt', (err, user, info, status) =>
        ctx.state.user = user || null)(ctx);
    await next();
}

router.get('/facebook', passport.authenticate('facebook'));
router.get('/oauth2/facebook',
    passport.authenticate('facebook', { session: false }),
    async (ctx) => {
        // const [token, refreshToken] = ['a', 'b']
        // ctx.redirect(`http://localhost:4000?token=${token}&refreshToken=${refreshToken}`);
    }
)

// GraphQL endpoints
router.post('/g',
    graphAuth(),
    apolloUploadKoa({ uploadDir: './uploads' }),
    graphqlKoa(ctx => {
        const curr_user = ctx.state.user;
        return {
            schema,
            rootValue: { ctx },
            context: {
                curr_user,
                // api,
            },
            debug: (process.env.NODE_ENV !== 'production')
        }
    })
)

export default () => compose([ router.routes(), router.allowedMethods() ]);
