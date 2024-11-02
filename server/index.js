import express from "express";
import multer from "multer";
import fs from "fs";
import dotenv from "dotenv";
import path from "path";
import { loginMiddleware, verifyMiddleware } from "./middlewares/middleware.js";
import { createToken } from "./jwt/jwt.js";
import { createUser } from "./database/mongodb.js";
import cors from 'cors';



dotenv.config();

const app = express();
app.use(express.json());

app.use('/uploads', express.static(path.join(process.cwd(), process.env.MULTER_FILE_PATH)));
app.use(cors());
const PORT = process.env.PORT;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const userEmail = req.user.email; 
        const userFolder = path.join(process.cwd(), process.env.MULTER_FILE_PATH, userEmail);
        if (!fs.existsSync(userFolder)) {
            fs.mkdirSync(userFolder, { recursive: true });
        }
        cb(null, userFolder);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

app.post("/login", loginMiddleware, (req, res) => {
    try {
        const email = req.body.email;
        const token = createToken(email);
        console.log(token);
        res.status(200).json({ message: "Login successful", token: token });
    } catch (err) {
        console.log("Error in login route: ", err);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.post("/signup", async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        const status = await createUser(userName, email, password);
        if (status) {
            res.status(200).json({ message: "User created successfully" });
        } else {
            res.status(409).json({ message: "Error creating user" });
        }
    } catch (err) {
        console.log("Error in signup route: ", err);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.post("/upload", verifyMiddleware, upload.single('file'), (req, res) => {
    try {
        res.status(200).json({ message: "File uploaded successfully" });
    } catch (err) {
        console.log("Error in file upload: ", err);
        res.status(500).json({ message: "File upload failed" });
    }
});
app.get('/files', verifyMiddleware, async (req, res) => {
    const userEmail = req.user.email; 
    const userFolder = path.join(process.cwd(), process.env.MULTER_FILE_PATH, userEmail);
    
    try {
        const files = await fs.promises.readdir(userFolder);
        const fileUrls = files.map(file => ({
            name: file,
            url: `/uploads/${userEmail}/${file}` 
        }));
        
        res.status(200).json({ files: fileUrls });
    } catch (err) {
        console.error("Error reading directory: ", err);
        res.status(500).json({ message: "Error reading directory" });
    }
});

try {
    app.listen(PORT, () => {
        console.log("Server running on port", PORT);
    });
} catch (err) {
    console.log("Error listening on port ", PORT, ": ", err);
}
