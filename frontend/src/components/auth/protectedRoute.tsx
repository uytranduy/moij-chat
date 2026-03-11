import useAuthStore from '@/stores/useAuthStore'
import type { B } from 'node_modules/react-router/dist/development/router-cLsU7kHk.d.mts'
import React, { useEffect, useState } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router'
const ProtectedRoute = () => {
    const { accessToken, user, loading, refresh } = useAuthStore()
    const [starting, setStarting] = useState(true)
    const init = async () => {
        if (!accessToken) {
            await refresh()
        }
        if (accessToken && !user) {
            await refresh()
        }
        setStarting(false)
    }
    useEffect(() => {
        if (starting) {
            init()
        }
    }, [])
    if (loading || starting) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        )
    }
    if (!accessToken) {
        return (
            <Navigate to="/signin" replace />
        )
    }
    return (
        <Outlet>

        </Outlet>
    )
}

export default ProtectedRoute