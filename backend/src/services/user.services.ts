import User from "models/user"

const fetchUserInfo = async (userId: string) => {
    try {
        console.log(userId)
        const user = await User.findById(userId).select('-hashPassword')
        if (!user) console.log("không tìm thấy user")
        return user

    } catch (error) {
        throw {
            error
        }
    }
}

export {
    fetchUserInfo
}