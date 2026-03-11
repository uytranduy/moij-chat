import useAuthStore from '@/stores/useAuthStore'
import React from 'react'
import { useNavigate } from 'react-router'
import { Button } from '../ui/button'

const Logout = () => {
    const { clearState, signOut } = useAuthStore()
    const navigate = useNavigate()
    const handleSignOut = async () => {
        await signOut()
        clearState()
        navigate('/signin')
    }
    return (
        <>
            <Button className="bg-green-500 hover:bg-green-600 text-white"
                onClick={handleSignOut}>
                Sign out
            </Button>
        </>
    )
}

export default Logout