"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const compose = require("koa-compose");
const passport = require("koa-passport");
const apollo_server_koa_1 = require("apollo-server-koa");
const apollo_upload_server_1 = require("apollo-upload-server");
const graphql_1 = require("./graphql");
const router = new Router();
/**
 * A custom middleware to generate user profile without throwing errors,
 * in this case, we insert dummy data here because graphiql cannot pass the Authorization headers.
 */
const graphAuth = () => async (ctx, next) => {
    await passport.authenticate('jwt', (err, user, info, status) => ctx.state.user = user || null)(ctx);
    await next();
};
router.get('/facebook', passport.authenticate('facebook'));
router.get('/oauth2/facebook', passport.authenticate('facebook', { session: false }), async (ctx) => {
    // const [token, refreshToken] = ['a', 'b']
    // ctx.redirect(`http://localhost:4000?token=${token}&refreshToken=${refreshToken}`);
});
// GraphQL endpoints
router.post('/g', graphAuth(), apollo_upload_server_1.apolloUploadKoa({ uploadDir: './uploads' }), apollo_server_koa_1.graphqlKoa(ctx => {
    const curr_user = ctx.state.user;
    return {
        schema: graphql_1.schema,
        rootValue: { ctx },
        context: {
            curr_user,
        },
        debug: (process.env.NODE_ENV !== 'production')
    };
}));
exports.default = () => compose([router.routes(), router.allowedMethods()]);
//# sourceMappingURL=index.js.map