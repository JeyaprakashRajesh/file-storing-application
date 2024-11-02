import { isExistingUser, validateUser } from "../database/mongodb.js";
import { verifyToken } from "../jwt/jwt.js";

export async function loginMiddleware(req, res, next) {
    try {
        const { email, password } = req.body;
        const result = await validateUser(email, password);
        if (result.status) {
            next();
        } else {
            res.status(401).json({ message: "Invalid login credentials" });
        }
    } catch (err) {
        console.log("Error in loginMiddleware: ", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function signupMiddleware(req, res, next) {
    try {
        const email = req.body.email;
        const status = await isExistingUser(email);
        if (status) {
            res.status(409).json({ message: "User already exists" });
        } else { 
            next();
        }
    } catch (err) {
        console.log("Error in signupMiddleware: ", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
export async function verifyMiddleware(req, res, next) {
    try {
        const header = req.headers["authorization"];
        if (!header) {
            return res.status(401).json({ message: "Authorization header missing" });
        }
        
        const token = header.split(" ")[1];
        const { status, email } = verifyToken(token);

        if (status && email) { 
            const isExisting = await isExistingUser(email);
            if (isExisting) {
                req.user = { email }; 
                next();
            } else { 
                res.status(401).json({ message: "Invalid token or email" });
            }
        } else {
            res.status(401).json({ message: "Invalid token or email" });
        }
    } catch (err) {
        console.log("Error in verifyMiddleware: ", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}