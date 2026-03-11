
import { Request, Response } from "express";
import Session from "models/session";
import { createUserAccount, loginAccount, refreshToken } from "services/auth.services";

const signUpAPI = async (req: Request, res: Response) => {
    const { username, password, confirmPassword, email, firstName, lastName } = req.body
    try {
        await createUserAccount(username, password, confirmPassword, email, firstName, lastName)
        return res.sendStatus(204)

    } catch (error: any) {

        if (error.errors) {
            return res.status(400).json(error);
        }
        return res.status(500).json({
            message: "Server error"
        });
    }
}
const signInAPI = async (req: Request, res: Response) => {
    const { username, password } = req.body
    try {
        const token = await loginAccount(username, password)
        res.cookie("refresh_token", token.refreshToken, {
            httpOnly: true,
            maxAge: token.ACCESS_TOKEN_TTL,
            sameSite: "none",
            secure: true
        })
        return res.status(200)
            .json({ token: token.ACCESS_TOKEN });
    } catch (error: any) {

        res.status(401).json({
            message: error.message
        })

    }

}

const signOutAPI = async (req: Request, res: Response) => {
    try {
        const refreshToken = req.cookies.refresh_token
        if (refreshToken) {
            await Session.deleteOne({ refreshToken })
            res.clearCookie("refresh_token")
        }
        return res.sendStatus(204)
    } catch (error: any) {
        console.log("lỗi gọi signout", error)
        res.status(500).json({
            message: "Server error!"
        })
    }

}

const refreshTokenAPI = async (req: Request, res: Response) => {
    try {
        const refresh_Token = req.cookies.refresh_token
        if (!refresh_Token) {
            res.status(401).json({
                message: "Token không tồn tại"
            })
        }
        const newToken = await refreshToken(refresh_Token)
        return res.status(200).json({
            data: newToken
        })
    } catch (error: any) {
        if (error.errors) {
            return res.status(400).json(error);
        }
        return res.status(500).json({
            message: "Server error"
        });
    }

}
export {
    signUpAPI, signInAPI, signOutAPI, refreshTokenAPI
}