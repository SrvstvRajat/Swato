const mongoose=require('mongoose');

//  Connecting Database
const db_link='mongodb+srv://rajatsri24:12345@cluster0.0rlijyn.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(db_link)
.then(function(db){
    console.log('review_db connected');
    // console.log(db);
})
.catch(function(err){
    console.log(err);
})

const reviewSchema=new mongoose.Schema(
{
    review:{
        type:String,
        required:[true,'Review Is Required']
    },
    rating:{
        type:Number,
        min:1,
        max:10,
        required:[true,'rating is required']
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'usermodel',
        required:[true,'review must belong to a user']
    },
    plan:{
        type:mongoose.Schema.ObjectId,
        ref:'planModel',
        required:[true,'review must belong to a plan']
    }
})


reviewSchema.pre(/^find/,function(next){
    this.populate({
        path:'user',
        select:'name profileImage'  
    }).populate('plan');
    next();
}); 

const reviewModel=mongoose.model('reviewModel',reviewSchema);

module.exports=reviewModel;