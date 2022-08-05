const planModel = require("../models/planModel");
const reviewModel = require("../models/reviewModel");


module.exports.getAllReviews=async function getAllReviews(req,res){
    try{
        const reviews=await reviewModel.find();
        if(reviews)
        {
            return res.json({
                message:"reviews retrieved",
                data:reviews,
            })
        }
    }
    catch(err)
    {
        return res.json({
            message:err.message
        })
    }
}


module.exports.top3reviews=async function top3reviews(req,res){
    try{
        const reviews=await reviewModel.find().sort({
            ratings:-1,
        }).limit(3); 
        if(reviews)
        {
            return res.json({
                message:"reviews retrieved",
                data:reviews,
            })
        }
    }
    catch(err)
    {
        return res.json({
            message:err.message
        })
    }
}


module.exports.getPlanReviews=async function getPlanReviews(req,res){
    try{
        const id=req.params.id;
        let reviews=await reviewModel.find();
        reviews=reviews.filter(review=>review.plan._id==id)
        if(reviews)
        {
            return res.json({
                message:"reviews retrieved for Plan Successfully",
                data:reviews,
            })
        }
    }
    catch(err)
    {
        return res.json({
            message:err.message
        })
    }
}


module.exports.createReview=async function createReview(req,res){
    try{
        let id=req.params.plan;
        let plan=await planModel.findById(id);
        let reviews=await reviewModel.create(req.body);
        //baaad me dkha jayega 
        plan.ratingsAverage=(req.body.ratings);
        console.log('kuch to ho rha')
        await plan.save();
        return res.json({
                message:"reviews creatred",
                data:reviews
            })
    }
    catch(err)
    {
        console.log('kuch nhi ho rha')
        return res.json({
            message:err.message
        })
    }
}


module.exports.updateReview=async function updateReview(req,res){
    try{
        let planid=req.param.id;
        let id=req.body._id;
        let reviews=await reviewModel.findById(id);
        if (reviews) {
            for (keys in req.body) 
            {
              reviews[keys] = req.body[keys];
            }
            await reviews.save();
            return res.json({
              message: "review updated successfully",
              data:reviews,
            });
        }
    }
    catch(err)
    {
        return res.json({
            message:err.message
        })
    }
}

module.exports.deleteReview=async function deleteReview(req,res){
    try{
        let planid=req.param.id;
        let id=req.body.id;
        let review=await reviewModel.findByIdAndDelete(id);
        return res.json({
                message:"reviews deleted",
                data:review
            })
    }
    catch(err)
    {
        return res.json({
            message:err.message
        })
    }
}