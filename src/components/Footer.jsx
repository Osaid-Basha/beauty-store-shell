import { Box, Button, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { tokens } from '../theme.js'

const footerLinks = [
  { label: 'Home', to: '/' },
  { label: 'Catalog', to: '/catalog' },
  { label: 'Cart', to: '/cart' },
  { label: 'Login', to: '/login' },
]

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        flex: '0 0 auto',
        borderTop: `1px solid ${tokens.outlineVariant}`,
        bgcolor: tokens.surfaceHighest,
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 1200,
          mx: 'auto',
          px: { xs: 1.5, sm: 3 },
          py: { xs: 1.25, sm: 1.5 },
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between',
          textAlign: { xs: 'center', sm: 'left' },
          gap: { xs: 0.5, sm: 2 },
        }}
      >
        <Box>
          <Typography fontSize={18} fontWeight={700} lineHeight={1.25}>
            Beauty Store
          </Typography>
          <Typography variant="caption" color="text.secondary">
            © {new Date().getFullYear()} Beauty Store Inc. All rights reserved.
          </Typography>
        </Box>

        <Box
          component="nav"
          aria-label="Footer navigation"
          sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          {footerLinks.map((link) => (
            <Button
              key={link.to}
              component={RouterLink}
              to={link.to}
              size="small"
              sx={{
                minWidth: 0,
                px: 1.25,
                color: 'text.secondary',
                fontWeight: 500,
              }}
            >
              {link.label}
            </Button>
          ))}
        </Box>
      </Box>
    </Box>
  )
}
