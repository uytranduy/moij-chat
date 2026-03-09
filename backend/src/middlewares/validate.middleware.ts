import { Response, Request, NextFunction } from "express";
import z from "zod"
const validate = (schema: z.ZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const parsed = await schema.parseAsync(req.body)
            req.body = parsed
            next()
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({
                    message: "Validation error",
                    error: error
                });
            }
        }
    }
}
export default validate