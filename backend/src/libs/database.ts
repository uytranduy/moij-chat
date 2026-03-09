import mongoose from "mongoose"
const connectDB = async () => {

    try {
        const connectURL = process.env.DATABASE_CONNECTION_STRING as string
        await mongoose.connect(connectURL,)
        console.log("Connect database successfully")
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
export default connectDB