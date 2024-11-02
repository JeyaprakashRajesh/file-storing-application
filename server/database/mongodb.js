import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config(); 
async function connectToMongoDB() {
    try {
        mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB connected successfully");
    } catch (err) {
        console.error("Error connecting to MongoDB: ", err);
    }
}

connectToMongoDB();

const userSkeleton = mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const User = mongoose.model("User", userSkeleton);

export async function validateUser(email, password) {
    try {
        const user = await User.findOne({ email });
        if (user && await bcrypt.compare(password, user.password)) {
            return { status: true, email };
        } else {
            return { status: false, email };
        }
    } catch (err) {
        console.error("Error validating user: ", err);
        return { status: false, email };
    }
}

export async function isExistingUser(email) {
    try {
        const user = await User.findOne({ email });
        return !!user;
    } catch (err) {
        console.error("Error checking user: ", err);
        return false;
    }
}

export async function createUser(userName, email, password) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            userName,
            email,
            password: hashedPassword,
        });
        await newUser.save();
        return true;
    } catch (err) {
        console.error("Error creating user: ", err);
        return false;
    }
}
