const mongoose=require('mongoose');
const bcrypt=require('bcrypt')
console.log(bcrypt)
//  Connecting Database

const crypto=require('crypto');
require("dotenv").config();
const db_link=process.env.DATA_BASE;
mongoose.connect(db_link)
.then(function(db){
    console.log('db connected');
    // console.log(db);
})
.catch(function(err){
    console.log(err);
})

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minLength:8
    },
    confirmPassword:{
        type:String,
        required:true,
        minLength:8
    },
    role:{
        type:String,
        enum:['admin','user','resturantowner','deliveryboy'],
        default:'user'
    },
    profileImage:{
        type:String,
        default:'img/users/default.jpg',
    },
    resetToken:String,
});


userSchema.pre('save',function(){
    this.confirmPassword=undefined;
})
userSchema.pre('save',async function(){
    let salt=await bcrypt.genSalt();
    let hashedString=await bcrypt.hash(this.password,salt);
    console.log(hashedString);
    this.password=hashedString; 
})

userSchema.methods.createResetToken=function(){
    //crypto packaage used for creating token
    const resetToken=crypto.randomBytes(32).toString('hex');
    this.resetToken=resetToken;
    return resetToken;
}

userSchema.methods.resetPasswordHandler=function(password,confirmPassword){
    this.password=password;
    this.confirmPassword=confirmPassword;
    this.resetToken=undefined;
}


const usermodel=mongoose.model('usermodel',userSchema);
module.exports = usermodel;