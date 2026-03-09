import { Response, Request, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { AuthRequest } from "types/request.type"

const protectedRoute = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {

        const authHeader = req.headers.authorization

        if (!authHeader) {
            return res.status(401).json({
                message: "Token not found"
            })
        }

        const token = authHeader.split(" ")[1]

        const dataDecoded = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET as string
        ) as { userId: string }

        req.userId = dataDecoded.userId

        next()

    } catch (error) {

        console.error("JWT verify error:", error)

        return res.status(401).json({
            message: "Token invalid or expired"
        })

    }
}

export default protectedRoute