import express from "express";
import dotenv from 'dotenv';
import cors from "cors";
import path from "path";

import notesRoutes from './routes/notesRoutes.js';
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app=express();
const port=process.env.PORT || 8080;
const __dirname=path.resolve();

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
if(process.env.NODE_ENV!=="production")
{
    app.use(cors({
        origin: "http://localhost:5173"
    }))
}
app.use("/api/notes", notesRoutes);

if(process.env.NODE_ENV==="production")
{
    app.use(express.static(path.join(__dirname,"../Frontend/dist")));

    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../Frontend","dist","index.html"));
    })
}