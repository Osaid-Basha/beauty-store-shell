const CATALOG_VERCEL_URL =
  import.meta.env.VITE_CATALOG_VERCEL_URL?.trim() ||
  'https://catalog-discovery-microfrontend.vercel.app'

const ACCOUNT_VERCEL_URL =
  import.meta.env.VITE_ACCOUNT_VERCEL_URL?.trim() || 'ACCOUNT_VERCEL_URL'

const CART_VERCEL_URL =
  import.meta.env.VITE_CART_VERCEL_URL?.trim() ||
  'https://cart-checkout-microfrontend.vercel.app'

export const REMOTE_IDS = Object.freeze({
  CATALOG: 'catalog',
  CART: 'cart',
  ACCOUNT: 'account',
})

export const REMOTES = Object.freeze({
  [REMOTE_IDS.CATALOG]: Object.freeze({
    id: REMOTE_IDS.CATALOG,
    name: 'Catalog',
    baseUrl: CATALOG_VERCEL_URL,
    placeholder: 'CATALOG_VERCEL_URL',
    environmentKey: 'VITE_CATALOG_VERCEL_URL',
  }),
  [REMOTE_IDS.CART]: Object.freeze({
    id: REMOTE_IDS.CART,
    name: 'Cart & Checkout',
    baseUrl: CART_VERCEL_URL,
  }),
  [REMOTE_IDS.ACCOUNT]: Object.freeze({
    id: REMOTE_IDS.ACCOUNT,
    name: 'Account',
    baseUrl: ACCOUNT_VERCEL_URL,
    placeholder: 'ACCOUNT_VERCEL_URL',
    environmentKey: 'VITE_ACCOUNT_VERCEL_URL',
  }),
})

export function isRemoteConfigured(remote) {
  if (!remote?.baseUrl || remote.baseUrl === remote.placeholder) {
    return false
  }

  try {
    const url = new URL(remote.baseUrl)
    return url.protocol === 'https:' || url.protocol === 'http:'
  } catch {
    return false
  }
}

export function getRemoteOrigin(remote) {
  if (!isRemoteConfigured(remote)) {
    return null
  }

  return new URL(remote.baseUrl).origin
}

export function buildRemoteUrl(remote, location) {
  if (!isRemoteConfigured(remote)) {
    return null
  }

  const destination = `${location.pathname}${location.search}${location.hash}`
  const remoteRoot = `${remote.baseUrl.replace(/\/+$/, '')}/`

  return new URL(destination, remoteRoot).toString()
}
