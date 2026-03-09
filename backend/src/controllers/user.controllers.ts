import { Request, Response } from "express";
import { fetchUserInfo } from "services/user.services";

const getUserAPI = async (req: Request, res: Response) => {
    try {
        const { userId } = req.user
        const user = await fetchUserInfo(userId)
        res.status(200).json({
            data: user
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "System error"
        })
    }
}
export {
    getUserAPI
}