import mongoose, { Model, Schema } from "mongoose";


const ReviewSchema = new Schema({
    name:{
      type:String,
      required:true,
     
    },
    filePath:{
      type:String,
      required:true,
     
    },
    review:{
     type:String,
     required:true,
     
    }
},{timeStamp:true})


const ReviewModel = mongoose.model("review",ReviewSchema);

export default ReviewModel;