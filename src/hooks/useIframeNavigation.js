import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getRemoteOrigin } from '../config/remotes.js'
import { parseNavigationMessage } from '../messaging/iframeBridge.js'

export default function useIframeNavigation(iframeRef, remote) {
  const navigate = useNavigate()

  useEffect(() => {
    const remoteOrigin = getRemoteOrigin(remote)

    if (!remoteOrigin) {
      return undefined
    }

    function handleMessage(event) {
      if (event.source !== iframeRef.current?.contentWindow) {
        return
      }

      if (event.origin !== remoteOrigin) {
        return
      }

      const destination = parseNavigationMessage(event.data, window.location.origin)

      if (destination) {
        navigate(destination)
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [iframeRef, navigate, remote])
}

