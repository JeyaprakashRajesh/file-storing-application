import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config(); 
const KEY = process.env.JWT_SECRET
export function createToken(email) {
    return jwt.sign({ email: email }, KEY)
}

export function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, KEY)
        return ({status : true , email : decoded.email })
    } catch (err) {
        return {status : true , email : null }
    }
}