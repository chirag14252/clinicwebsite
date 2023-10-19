import ReviewModel from "../Models/Review.js"

const ReviewController = async (req,res)=>{
    const filePath = req.file?.path;
    console.log(req.file);
    const name = req.body.nameuser;
    
    const review = req.body.review;

   if(!name || !filePath || !review){
    return res.status(400).json({message:"fill the details properly"});
   }
   const ExistingReview = await ReviewModel.findOne({name:name});
  if(ExistingReview){
    return res.status(400).json({
      message:"Review Already filled"
    })
  }
   
   const data = await ReviewModel.create({
       name:name,
       filePath:filePath,
       review:review
    });

    if(data){
      return res.status(200).json({message:"your review has been added"});
    }
    else{
      return res.status(500).json({message:"internal server error"});
    }
   
  }
  
  

  export default ReviewController;