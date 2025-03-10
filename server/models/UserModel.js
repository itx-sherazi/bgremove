import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
    clerkId:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    photo:{
        type: String,
        required: true
    },
    firstname:{
        type: String,
        
    },
    lastname:{
        type: String,
    },
    creditBalance:{
        type: Number,
        default: 5
    }
})

 const User = mongoose.model("User", userSchema);

export default User;