import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined'
import { AppBar, Box, Button, IconButton, Toolbar, Tooltip } from '@mui/material'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { tokens } from '../theme.js'

const navItems = [
    { label: 'Home', to: '/', icon: HomeOutlinedIcon },
    { label: 'Catalog', to: '/catalog', icon: StorefrontOutlinedIcon },
    { label: 'Cart', to: '/cart', icon: ShoppingBagOutlinedIcon },
    { label: 'Account', to: '/login', icon: AccountCircleOutlinedIcon }
]

function isNavigationItemActive(pathname, target) {
  if (target === '/') {
    return pathname === '/'
  }

  if (target === '/catalog') {
    return pathname === '/catalog' || pathname.startsWith('/product/')
  }

  if (target === '/cart') {
    return (
      pathname === '/cart' ||
      pathname.startsWith('/checkout/') ||
      pathname === '/order-confirmation'
    )
  }

    return [
        '/login',
        '/register',
        '/dashboard',
        '/order-history',
        '/reviews',
        '/wishlist',
    ].includes(pathname)
}

export default function Navbar() {
  const { pathname } = useLocation()

  return (
    <AppBar
      component="header"
      position="static"
      color="inherit"
      elevation={1}
      sx={{
        zIndex: (theme) => theme.zIndex.appBar,
        height: 64,
        flex: '0 0 64px',
        justifyContent: 'center',
        bgcolor: tokens.surface,
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          width: '100%',
          maxWidth: 1200,
          minHeight: '64px !important',
          mx: 'auto',
          px: { xs: 1.5, sm: 3 },
          gap: { xs: 0.5, sm: 3 },
        }}
      >
        <Button
          component={RouterLink}
          to="/"
          aria-label="Beauty Store home"
          sx={{
            minWidth: 0,
            p: 0,
            color: 'primary.main',
            fontSize: 23,
            fontWeight: 800,
            lineHeight: 1,
            whiteSpace: 'nowrap',
            '&:hover': { bgcolor: 'transparent' },
            '@media (min-width: 701px)': { fontSize: 28 },
          }}
        >
          Beauty Store
        </Button>

        <Box
          component="nav"
          aria-label="Main navigation"
          sx={{
            display: 'none',
            alignItems: 'center',
            gap: 0.5,
            '@media (min-width: 701px)': { display: 'flex' },
          }}
        >
          {navItems.map((item) => {
            const isActive = isNavigationItemActive(pathname, item.to)

            return (
              <Button
                key={item.to}
                component={RouterLink}
                to={item.to}
                aria-current={isActive ? 'page' : undefined}
                sx={{
                  color: isActive ? 'primary.main' : 'text.secondary',
                  bgcolor: isActive ? tokens.primaryFixed : 'transparent',
                  fontWeight: isActive ? 700 : 500,
                  '&:hover': {
                    bgcolor: isActive ? tokens.primaryFixed : tokens.surfaceLow,
                  },
                }}
              >
                {item.label}
              </Button>
            )
          })}
        </Box>

        <Box sx={{ flex: 1 }} />

        <Box
          component="nav"
          aria-label="Mobile navigation"
          sx={{
            display: 'flex',
            alignItems: 'center',
            '@media (min-width: 701px)': { display: 'none' },
          }}
        >
          {navItems.slice(1).map((item) => {
            const Icon = item.icon
            const isActive = isNavigationItemActive(pathname, item.to)

            return (
              <Tooltip key={item.to} title={item.label}>
                <IconButton
                  component={RouterLink}
                  to={item.to}
                  aria-label={item.label}
                  aria-current={isActive ? 'page' : undefined}
                  sx={{
                    color: isActive ? 'primary.main' : 'text.secondary',
                    bgcolor: isActive ? tokens.primaryFixed : 'transparent',
                  }}
                >
                  <Icon />
                </IconButton>
              </Tooltip>
            )
          })}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

