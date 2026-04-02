import express from "express";
import dotenv from 'dotenv';
import cors from "cors";

import notesRoutes from './routes/notesRoutes.js';
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app=express();
const port=process.env.PORT;

await connectDB()
    .then(()=>{
        console.log("DB Connected");
        app.listen(port,()=>{
            console.log(`Server running on port ${port}`);
        })
    })
    .catch((e)=>{
        console.log(e);
        process.exit(1);
    })

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(rateLimiter);
app.use(cors({
    origin: "http://localhost:5173"
}))
app.use("/api/notes", notesRoutes);