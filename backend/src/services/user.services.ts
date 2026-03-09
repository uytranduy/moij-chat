import User from "models/user"

const fetchUserInfo = async (userId: string) => {
    try {
        return await User.findOne({ userId })

    } catch (error) {
        throw {
            error
        }
    }
}

export {
    fetchUserInfo
}