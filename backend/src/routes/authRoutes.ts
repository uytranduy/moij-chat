import { refreshTokenAPI, signInAPI, signOutAPI, signUpAPI } from "controllers/auth.controllers"
import express, { Express } from "express"
import validate from "middlewares/validate.middleware"
import { loginSchema } from "validate/login.validate"
import { registerSchema } from "validate/register.validate"

const route = express.Router()

const authRoute = (app: Express) => {
    route.post("/signup", validate(registerSchema), signUpAPI)
    route.post("/signin", validate(loginSchema), signInAPI)
    route.post("/signout", signOutAPI)
    route.post("/refresh", refreshTokenAPI)
    app.use("/auth", route)
}
export default authRoute