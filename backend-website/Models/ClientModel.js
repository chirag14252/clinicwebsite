import { Schema } from "mongoose";
import mongoose from "mongoose";

const user = new Schema(
    {
        clientname:{
            type: String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        mobile:{
            type:String,
            required:true
        }
    },{timestamps:true}
)

const ClientModels = mongoose.model("patient",user);


export default ClientModels;