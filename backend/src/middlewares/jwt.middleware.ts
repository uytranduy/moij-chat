import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { fetchUserInfo } from "services/user.services";

const protectedRoute = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers["authorization"]?.split(" ")[1] as string
        //kiem tra token
        if (!token) {
            res.status(401).json({
                message: "Not found token"
            })
        }
        const dataDecoded: any = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string)
        if (!dataDecoded) {
            res.status(401).json({
                message: "token id invalid"
            })
        }



        //kiem tra user
        const user = dataDecoded.userId
        if (!user) {
            res.status(404).json({
                message: "User isn't existed"
            })
        }

        //dan 
        req.user = user
        next()
    } catch (error) {

        console.error("Lỗi khi xác minh JWT trong authMiddleware", error)
        return res.status(500).json({ message: "Lỗi hệ thống" })

    }
}
export default protectedRoute