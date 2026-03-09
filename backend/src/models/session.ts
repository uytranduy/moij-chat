import mongoose from "mongoose";
import User from "./user";
interface ISession {
    userId: any,
    refreshToken: string,
    expiresAt: Date

}
const sessionSchema = new mongoose.Schema<ISession>(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true

        },
        refreshToken: {
            type: String,
            required: true,
            unique: true
        },
        expiresAt: {
            type: Date,
            required: true,
            index: { expires: 0 }
        }

    },
    {
        timestamps: true
    }
)

export default mongoose.model("Session", sessionSchema)