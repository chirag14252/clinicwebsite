
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import newLetter from "./controllers/newLetter.js";
import clientDetails from "./controllers/clientDetails.js";
dotenv.config();
const app = express();
const port = process.env.PORT;
app.use(cors());
app.use(express.json());
app.set("view engine","ejs");
const mongoURL = process.env.URL; 
mongoose.connect(`${mongoURL}`).then(
    ()=>{
        console.log("database connected successfully");
    }
)

app.get("/",(req,res)=>{
    return res.status(200).json({
        message:"api running successfully"
    })
})

//Api for adding user-details along with services
app.post("/client",clientDetails);



// for saving the newsletter in database
app.post("/newsletter",newLetter)





app.listen(port,()=>{
    console.log("server is running at "+ port);
})