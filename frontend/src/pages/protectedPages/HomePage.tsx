import Logout from '@/components/auth/logout'
import useAuthStore from '@/stores/useAuthStore'
const HomePage = () => {
    const user = useAuthStore((state) => state.user)
    return (
        <>
            <div>Welcome, {user?.username}!</div>
            <div>HomePage</div>
            <Logout />

        </>

    )
}

export default HomePage