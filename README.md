# Beauty Store Shell

The standalone integration Shell for the Beauty & Cosmetics Store microfrontend system. It owns only global navigation, the global footer, route ownership, iframe composition, and the cross-frame navigation bridge. Catalog, Cart/Checkout, and Account business logic stays in independently deployed applications.

## Architecture

The Shell uses React Router to map the browser URL to a remote owner. The matching remote is loaded in a borderless iframe that fills all space between the shared 64px Navbar and the responsive Footer.

```text
Browser URL
    ↓
React Router route registry
    ↓
Catalog | Cart & Checkout | Account
    ↓
Responsive cross-origin iframe
```

No React components or business modules are imported from a microfrontend repository. Each application remains independently built and deployed on Vercel.

## Routes and iframe URLs

The Shell passes the complete pathname, query string, and hash to the selected remote.

| Shell route | Owner | Iframe source |
| --- | --- | --- |
| `/` | Catalog | `CATALOG_VERCEL_URL/` |
| `/products` | Catalog | `CATALOG_VERCEL_URL/products` |
| `/product/:id` | Catalog | `CATALOG_VERCEL_URL/product/:id` |
| `/cart` | Cart | `https://cart-checkout-microfrontend.vercel.app/cart` |
| `/checkout/shipping` | Cart | `https://cart-checkout-microfrontend.vercel.app/checkout/shipping` |
| `/checkout/payment` | Cart | `https://cart-checkout-microfrontend.vercel.app/checkout/payment` |
| `/order-confirmation` | Cart | `https://cart-checkout-microfrontend.vercel.app/order-confirmation` |
| `/login` | Account | `ACCOUNT_VERCEL_URL/login` |
| `/register` | Account | `ACCOUNT_VERCEL_URL/register` |
| `/profile` | Account | `ACCOUNT_VERCEL_URL/profile` |
| `/orders` | Account | `ACCOUNT_VERCEL_URL/orders` |
| `/wishlist` | Account | `ACCOUNT_VERCEL_URL/wishlist` |

Unknown Shell routes redirect to `/`.

## Configure Catalog and Account

Copy `.env.example` to `.env.local` and replace both placeholders with deployed origins (do not include a trailing slash):

```dotenv
VITE_CATALOG_VERCEL_URL=https://your-catalog.vercel.app
VITE_ACCOUNT_VERCEL_URL=https://your-account.vercel.app
```

For Vercel, add the same names and values in **Project Settings → Environment Variables**, then redeploy. Vite injects client configuration during the build, so changing an environment variable requires a new build.

The literal `CATALOG_VERCEL_URL` and `ACCOUNT_VERCEL_URL` fallbacks live in `src/config/remotes.js`. Until each one is replaced or supplied through an environment variable, the Shell displays a configuration notice instead of recursively loading itself as a relative iframe URL.

## Iframe navigation contract

A microfrontend requests Shell navigation with `window.parent.postMessage`. The preferred versioned message is:

```js
window.parent.postMessage(
  {
    channel: 'beauty-store-shell',
    version: 1,
    type: 'beauty:navigate',
    payload: { path: '/cart' },
  },
  'https://your-shell.vercel.app',
)
```

For migration convenience, `{ type: 'beauty:navigate', path: '/cart' }` is also accepted. The Shell validates that:

- the message came from the currently rendered iframe window;
- `event.origin` exactly matches that remote's configured origin;
- the destination stays on the Shell origin; and
- the destination matches a registered Shell route.

The reusable protocol helpers are in `src/messaging/iframeBridge.js`; the React listener is in `src/hooks/useIframeNavigation.js`. Future Catalog and Account events can use `createIframeMessage` and `postMessageToIframe` without creating direct React dependencies between repositories.

> A DOM `CustomEvent` dispatched inside a microfrontend does not cross an iframe boundary. Remotes must use `window.parent.postMessage` for Shell navigation.

## Local development

Requirements: Node.js 20.19 or newer.

```bash
npm install
npm run dev
```

Production verification:

```bash
npm run build
npm run preview
```

## Vercel deployment

Import this repository as its own Vercel project, add the two `VITE_*` environment variables, and deploy with the default Vite settings. `vercel.json` rewrites all application routes to `index.html`, so direct visits to routes such as `/checkout/payment` work with React Router.

Each remote must allow the Shell to frame it. In particular, its `Content-Security-Policy` `frame-ancestors` directive and any `X-Frame-Options` header must permit the deployed Shell origin. Authentication flows must also account for modern cross-site cookie restrictions.

Every remote also needs its own SPA fallback on Vercel so that its iframe deep links return that remote's `index.html`. The Shell rewrite applies only to the Shell deployment; it cannot make `/cart`, `/product/:id`, or another deep link work on a different Vercel project.

Embedded remotes should omit their own global Navbar and Footer. Cross-origin iframe isolation means the Shell cannot hide duplicate remote chrome after a remote has rendered it.
