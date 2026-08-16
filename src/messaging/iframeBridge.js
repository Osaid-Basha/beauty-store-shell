import { isShellRoute } from '../routing/remoteRoutes.js'

export const IFRAME_MESSAGE_CHANNEL = 'beauty-store-shell'
export const IFRAME_MESSAGE_VERSION = 1

export const IFRAME_MESSAGE_TYPES = Object.freeze({
  NAVIGATE: 'beauty:navigate',
})

function isObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

export function createIframeMessage(type, payload = {}) {
  return {
    channel: IFRAME_MESSAGE_CHANNEL,
    version: IFRAME_MESSAGE_VERSION,
    type,
    payload,
  }
}

export function createNavigationMessage(path) {
  return createIframeMessage(IFRAME_MESSAGE_TYPES.NAVIGATE, { path })
}

export function getNavigationTarget(data) {
  if (!isObject(data) || data.type !== IFRAME_MESSAGE_TYPES.NAVIGATE) {
    return null
  }

  if ('channel' in data || 'version' in data) {
    if (
      data.channel !== IFRAME_MESSAGE_CHANNEL ||
      data.version !== IFRAME_MESSAGE_VERSION
    ) {
      return null
    }
  }

  if (isObject(data.payload) && typeof data.payload.path === 'string') {
    return data.payload.path
  }

  // Compatibility shape for remotes that send { type: 'beauty:navigate', path }.
  return typeof data.path === 'string' ? data.path : null
}

export function parseNavigationMessage(data, shellOrigin) {
  const target = getNavigationTarget(data)?.trim()

  if (!target || !target.startsWith('/') || target.startsWith('//')) {
    return null
  }

  try {
    const url = new URL(target, shellOrigin)

    if (url.origin !== shellOrigin || !isShellRoute(url.pathname)) {
      return null
    }

    return `${url.pathname}${url.search}${url.hash}`
  } catch {
    return null
  }
}

export function postMessageToIframe(iframe, message, targetOrigin) {
  if (!iframe?.contentWindow || !targetOrigin) {
    return false
  }

  iframe.contentWindow.postMessage(message, targetOrigin)
  return true
}

