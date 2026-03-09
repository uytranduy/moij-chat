import { Request, Response } from "express";
import { fetchUserInfo } from "services/user.services";
import { AuthRequest } from "types/request.type";

const getUserAPI = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.userId
        const user = await fetchUserInfo(userId!)
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