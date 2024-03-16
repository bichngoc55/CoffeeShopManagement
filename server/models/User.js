const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema(
    {
        Name: {
            type: String,
            required: true,
            min: 5,
            max: 70,
        },
        email: {
            type: String,
            required: true,
            max: 50,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            min: 5,
        },
        Ava: {
            type: String,
            default: "",
        },
        Phone: {
            type: String,
            default: "",
        },
        dateOfBirth: {
            type: Date,
            default: "",
        },
        Position: {
            type: Boolean 
        },

        location: String, 
    },
    { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;