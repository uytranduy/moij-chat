
import { getUserAPI } from "controllers/user.controllers"
import express, { Express } from "express"
import protectedRoute from "middlewares/jwt.middleware"


const route = express.Router()

const privateRoute = (app: Express) => {
    route.get("/user", getUserAPI)
    app.use("/api", protectedRoute, route)
}
export default privateRoute