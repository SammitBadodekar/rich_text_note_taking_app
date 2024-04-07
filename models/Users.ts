import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true,
    },
    notes: {
        type: Array,
    }
});

const User = mongoose.models.user || mongoose.model("user", userSchema);

export default User;