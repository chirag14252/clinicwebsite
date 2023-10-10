import mongoose from "mongoose";

import { Schema } from "mongoose";

const  NewLetter = new Schema({
   email:{
    type:String,
    required:false
   }
 } ,{timestamps:true});


 const NewLetterModel  = mongoose.model("newsletter",NewLetter);

 export default NewLetterModel;
