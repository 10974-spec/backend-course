
import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "User Name is required"],
        trim: true,
        minLength: 2,
        maxLength: 50,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: 2,
        maxLength: 50,
        lowercase: true,
        match:[/\S+@\S+\.\S+/, "please fill a valid email address"],
    },
    password: {
        type: String,
        required: [true, "User Password is required"],
        minLength: 6,
    },
}, {
    timestamps: true,
})

// models start with a capital letter 
const User = mongoose.model("User", userSchema);

export default User;