import { matchPath } from 'react-router-dom'
import { REMOTE_IDS } from '../config/remotes.js'

export const REMOTE_ROUTES = Object.freeze([
  Object.freeze({ path: '/', remoteId: REMOTE_IDS.CATALOG }),
  Object.freeze({ path: '/catalog', remoteId: REMOTE_IDS.CATALOG }),
  Object.freeze({ path: '/product/:id', remoteId: REMOTE_IDS.CATALOG }),
  Object.freeze({ path: '/cart', remoteId: REMOTE_IDS.CART }),
  Object.freeze({
    path: '/checkout/shipping',
    remoteId: REMOTE_IDS.CART,
  }),
  Object.freeze({
    path: '/checkout/payment',
    remoteId: REMOTE_IDS.CART,
  }),
  Object.freeze({
    path: '/order-confirmation',
    remoteId: REMOTE_IDS.CART,
  }),
  Object.freeze({
    path: '/login',
    remoteId: REMOTE_IDS.ACCOUNT,
  }),
  Object.freeze({
    path: '/register',
    remoteId: REMOTE_IDS.ACCOUNT,
  }),
  Object.freeze({
    path: '/dashboard',
    remoteId: REMOTE_IDS.ACCOUNT,
  }),
  Object.freeze({
    path: '/order-history',
    remoteId: REMOTE_IDS.ACCOUNT,
  }),
  Object.freeze({
    path: '/reviews',
    remoteId: REMOTE_IDS.ACCOUNT,
  }),
  Object.freeze({
    path: '/wishlist',
    remoteId: REMOTE_IDS.ACCOUNT,
  }),
])

export function resolveRemoteRoute(pathname) {
  return (
      REMOTE_ROUTES.find((route) =>
          matchPath(
              {
                path: route.path,
                end: true,
                caseSensitive: false,
              },
              pathname,
          ),
      ) ?? null
  )
}

export function isShellRoute(pathname) {
  return resolveRemoteRoute(pathname) !== null
}
