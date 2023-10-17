
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import path from "path";
import cors from "cors";
import newLetter from "./controllers/newLetter.js";
import clientDetails from "./controllers/clientDetails.js";
import ReviewModel from "./Models/Review.js";
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

const upload = multer({dest:"./public/files"})


app.post("/review",upload.single("upl"),(req,res)=>{
  const filePath = req.file.path;
  console.log(filePath);
  const name = req.body.nameuser;
  console.log(name);
  const review = req.body.review;
  console.log(review);
  ReviewModel.create({
     name:name,
     filePath:filePath,
     review:review
  }).then((data,err)=>{
    if(data){
        console.log(data);
    }
    if(err){
        console.log(err);
    }
  })

})




app.use("/show",(req,res)=>{
res.status(200).render("index");
})

app.listen(port,()=>{
    console.log("server is running at "+ port);
})