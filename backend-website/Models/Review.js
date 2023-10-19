import mongoose, { Model, Schema } from "mongoose";


const ReviewSchema = new Schema({
    name:{
      type:String,
       required:true,
       unique:true
    },
    filePath:{
      type:String,
      required:true,
      unique:true 
    },
    review:{
     type:String,
     required:true,
     unique:true
    }
},{timeStamp:true})


const ReviewModel = mongoose.model("review",ReviewSchema);

export default ReviewModel;