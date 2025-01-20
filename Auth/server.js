import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors"
import Routes from "./routes/index.route.js"

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

//middleware
// app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//routes
app.use(Routes)



app.listen(PORT, ()=>{
    connectDB()
    console.log(`Auth service is working on PORT ${PORT}`)
} )