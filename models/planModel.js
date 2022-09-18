const mongoose=require('mongoose');

//  Connecting Database

// const crypto=require('crypto');
const db_link='mongodb+srv://rajatsri24:12345@cluster0.0rlijyn.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(db_link)
.then(function(db){
    console.log('plan db connected');
    // console.log(db);
})
.catch(function(err){
    console.log(err);
})


const planSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        maxlength:[20,'plan name should not exceed more than 20 characters']
    },
    duration:{
        type:Number,
        required:true,
    },
    ratingsAverage:{
        type:Number,
        default:1,
    },
    price:{
        type:Number,
        required:[true,'price not entered'],
    },
    discount:{
        type:Number,
        validate:[function(){
            return this.discount<100;
        },'dicount should not exceed price']
    },
});

const planModel=mongoose.model('planModel',planSchema);
module.exports=planModel;