import User from "models/user"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import Session from "models/session"
import crypto from "crypto"

const ACCESS_TOKEN_EXPIRES_IN = 15 * 60 * 1000
const ACCESS_TOKEN_TTL = 7 * 24 * 60 * 60 * 1000
const createUserAccount = async (
    username: string,
    password: string,
    confirmPassword: string,
    email: string,
    firstName: string,
    lastName: string) => {

    const [isUsernameExisted, isEmailExisted] = await Promise.all([User.findOne({ username }), User.findOne({ email })])

    const errors: Record<string, string> = {}
    if (isUsernameExisted) errors.username = "Tên đăng nhập đã tồn tại!"
    if (isEmailExisted) errors.email = "Email đã tồn tại!"
    if (password !== confirmPassword) errors.password = "Password and confirm password don't match"
    if (Object.keys(errors).length > 0) {
        throw {
            errors
        }
    }
    const hashPassword = await bcrypt.hash(password, 10)

    await User.create({
        username,
        hashPassword,
        email,
        displayName: `${firstName} ${lastName}`
    })
}
const loginAccount = async (
    username: string,
    password: string,
) => {
    const user = await User.findOne({ username })
    if (!user) {
        throw new Error("Tên đăng nhập hoặc mật khẩu không chính xác!")
    }
    const match = await bcrypt.compare(password, user.hashPassword)
    console.log(match)
    if (!match) throw new Error("Tên đăng nhập hoặc mật khẩu không chính xác!")


    const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;


    const ACCESS_TOKEN = jwt.sign(
        { userId: user._id },
        // @ts-ignore
        ACCESS_TOKEN_SECRET!,
        { expiresIn: ACCESS_TOKEN_EXPIRES_IN! }
    );
    const refreshToken = crypto.randomBytes(64).toString("hex");
    await Session.create(
        {
            userId: user._id,
            refreshToken,
            expiresAt: new Date(Date.now() + ACCESS_TOKEN_TTL)
        }
    )

    return {
        ACCESS_TOKEN, refreshToken, ACCESS_TOKEN_TTL
    }


}
const refreshToken = async (refreshToken: string) => {
    const errors: Record<number, string> = {}
    const session = await Session.findOne({ refreshToken })
    if (!session) {
        errors[403] = "Token is invalid"
    }
    else if (session?.expiresAt < new Date()) {
        errors[403] = "Token is expired"
    }
    if (Object.keys(errors).length > 0) {
        throw {
            errors
        }
    }
    const newToken = jwt.sign(
        { userId: session?.userId },
        process.env.ACCESS_TOKEN_SECRET as string,
        {
            expiresIn: ACCESS_TOKEN_EXPIRES_IN
        }
    )
    return newToken
}
export {
    createUserAccount, loginAccount, refreshToken

}