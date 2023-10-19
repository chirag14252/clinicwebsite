
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import path from "path";
import cors from "cors";
import newLetter from "./controllers/newLetter.js";
import clientDetails from "./controllers/clientDetails.js";
import ReviewController from "./controllers/ReviewController.js";

import multer from "multer";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();
const port = process.env.PORT;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(`${__dirname}/public`))
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended:true
}))
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


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Configuring file storage destination
      cb(null, "./public/files");
    },
    filename: function (req, file, cb) {
      // Configuring file name for storage
      cb(null, file.originalname);
    },
  });
const upload = multer({storage})


app.post("/review",upload.single("upl"),ReviewController);
 
// get review  Api

app.get("/getReview",(req,res)=>{
    ReviewModel.find().then((data,err)=>{
     return res.status(200).json({
        message:data
     })
    })
})



app.use("/show",(req,res)=>{
res.status(200).render("index");
})

app.listen(port,()=>{
    console.log("server is running at "+ port);
})