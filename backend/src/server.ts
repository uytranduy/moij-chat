import express from "express";
import dotenv from "dotenv"
import connectDB from "libs/database";
import authRoute from "routes/authRoutes";
import cookieParser from "cookie-parser";
import privateRoute from "routes/privateRoutes";
import cors from "cors"
const app = express();
const PORT = process.env.PORT || 5001
dotenv.config()
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}))
app.use(express.json())
app.use(cookieParser())
//public route
authRoute(app)
//private route
privateRoute(app)
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("server chạy trên cổng : ", PORT)
    })
})
