import { Request, Response } from "express";
import { AuthRequest } from "types/request.type";

const getUserAPI = async (req: AuthRequest, res: Response) => {
    try {
        const user = req.user
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