
import express from "express";

import mongoose from "mongoose";
import cors from "cors";
import newLetter from "./controllers/newLetter.js";
import clientDetails from "./controllers/clientDetails.js";
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());
app.set("view engine","ejs");
mongoose.connect("mongodb+srv://USER:X4YtymbjdkRYcfT5@atlascluster.nilxnts.mongodb.net/Clinic?retryWrites=true&w=majority").then(
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