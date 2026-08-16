import { Box } from '@mui/material'
import { Navigate, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer.jsx'
import MicrofrontendFrame from './components/MicrofrontendFrame.jsx'
import Navbar from './components/Navbar.jsx'
import { REMOTE_ROUTES } from './routing/remoteRoutes.js'

export default function App() {
    return (
        <Box
            sx={{
                width: '100%',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                '@supports (height: 100dvh)': {
                    height: '100dvh',
                },
            }}
        >
            <Navbar />

            <Routes>
                <Route path="/" element={<MicrofrontendFrame />} />
                <Route path="/products" element={<Navigate to="/catalog" replace />} />

                {REMOTE_ROUTES.filter((route) => route.path !== '/').map((route) => (
                    <Route
                        key={route.path}
                        path={route.path}
                        element={<MicrofrontendFrame />}
                    />
                ))}

                <Route path="*" element={<Navigate to="/catalog" replace />} />
            </Routes>

            <Footer />
        </Box>
    )
}
