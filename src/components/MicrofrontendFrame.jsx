import SettingsSuggestOutlinedIcon from '@mui/icons-material/SettingsSuggestOutlined'
import { Box, Paper, Typography } from '@mui/material'
import { useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { buildRemoteUrl, REMOTES } from '../config/remotes.js'
import useIframeNavigation from '../hooks/useIframeNavigation.js'
import { resolveRemoteRoute } from '../routing/remoteRoutes.js'
import { tokens } from '../theme.js'

export default function MicrofrontendFrame() {
  const location = useLocation()
  const iframeRef = useRef(null)
  const route = resolveRemoteRoute(location.pathname)
  const remote = REMOTES[route.remoteId]
  const iframeUrl = buildRemoteUrl(remote, location)

  useIframeNavigation(iframeRef, remote)

  return (
    <Box
      component="main"
      aria-label={`${remote.name} microfrontend`}
      sx={{
        position: 'relative',
        display: 'flex',
        flex: '1 1 auto',
        minHeight: 0,
        overflow: 'hidden',
        bgcolor: tokens.background,
      }}
    >
      <Box
        key={remote.id}
        ref={iframeRef}
        component="iframe"
        title={`${remote.name} microfrontend`}
        src={iframeUrl ?? 'about:blank'}
        data-remote-placeholder={iframeUrl ? undefined : remote.placeholder}
        referrerPolicy="strict-origin-when-cross-origin"
        sx={{
          display: 'block',
          width: '100%',
          height: '100%',
          flex: '1 1 auto',
          border: 0,
          bgcolor: tokens.surface,
        }}
      />

      {!iframeUrl && (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'grid',
            placeItems: 'center',
            p: 3,
            bgcolor: tokens.background,
          }}
        >
          <Paper
            elevation={0}
            role="status"
            sx={{
              width: '100%',
              maxWidth: 520,
              p: { xs: 3, sm: 4 },
              textAlign: 'center',
              border: `1px solid ${tokens.outlineVariant}`,
              borderRadius: 3,
              bgcolor: tokens.surface,
            }}
          >
            <SettingsSuggestOutlinedIcon
              color="primary"
              sx={{ fontSize: 40, mb: 1.5 }}
            />
            <Typography component="h1" variant="h2" gutterBottom>
              Connect the {remote.name} microfrontend
            </Typography>
            <Typography color="text.secondary">
              Set <strong>{remote.environmentKey}</strong> to its deployed Vercel URL,
              then rebuild the Shell.
            </Typography>
          </Paper>
        </Box>
      )}
    </Box>
  )
}

