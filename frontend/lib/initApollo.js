

import { ApolloClient, createNetworkInterface } from "react-apollo"
import fetch from "isomorphic-unfetch"
import Cookie from 'js-cookie'

const uri = "http://api.bumiprop.com/g"

let apolloClient = null

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch
}

function create(headers, initialState, ni) {
  let networkInterface = ni;
  if (!ni) {
    networkInterface = createNetworkInterface({ uri })
    networkInterface.use([{
      applyMiddleware(req, next) {

        if (!req.options.headers)
          req.options.headers = {}

        if (apolloClient) {
          // Check whether the token is exists or not. If not, renew one if there is an existing
          // refreshToken.
          if (!Cookie.get('token')) {
            if (Cookie.get('refreshToken')) {
              console.log('token not found, refreshing token')
              fetch('/t', { headers: { Authorization: Cookie.get('refreshToken') } })
                .then(res => res.json())
                .then(json => {
                  Cookie.set('token', json.token, { expires: 1 })
                  Cookie.set('refreshToken', json.refreshToken, { expires: 21 })
                })
            }
          }

          const token = Cookie.get('token') || null
          req.options.headers['Authorization'] = `Bearer ${token}`
        }

        if (!process.browser)
          req.options.headers = headers

        next()
      }
    }])
  }

  return new ApolloClient({
    initialState,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    networkInterface,
  })
}

export default function initApollo(headers, initialState = {}) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser)
    return create(headers, initialState)

  // Reuse client on the client-side
  if (!apolloClient)
    apolloClient = create(headers, initialState)

  return apolloClient;
}
