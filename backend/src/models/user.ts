import mongoose from "mongoose";
interface IUser {
    username: string,
    hashPassword: string,
    email: string,
    displayName: string,
    avatarUrl: string,
    avatarId: string,
    bio: string,
    phone: string,
    provider: string,
    googleId: string

}
const userSchema = new mongoose.Schema<IUser>(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },
        hashPassword: {
            type: String,
            required: function (this: IUser) {
                return this.provider === "local"
            }
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            unique: true,
        },
        displayName: {
            type: String,
            required: true,
            trim: true,

        },
        avatarId: {
            type: String,
        },
        avatarUrl: {
            type: String,
        },
        bio: {
            type: String,
        },
        phone: {
            type: String,
            sparse: true

        }, provider: {
            type: String,
            enum: ["local", "google"],
            default: "local"
        },

        googleId: {
            type: String,
            unique: true,
            sparse: true
        }
    },
    {
        timestamps: true
    }
)
const User = mongoose.model("User", userSchema)

export default User
