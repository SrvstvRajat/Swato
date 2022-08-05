const usermodel=require('../models/usermodel')

module.exports.getUser=async function getUser(req,res){
    let id=req.id;
    // console.log(id)
    let user=await usermodel.findById(id);
    if(user)
    {
        // console.log(user);
        res.json(user);
    }
    else{
        return res.json({
            message:'user not found',
        })
    }
}



module.exports.getAllUser=async function getAllUser(req,res){
    let alluser=await usermodel.find();
    if(alluser)
    {
        res.json({
            message:'users found',
            data:alluser,
        })   
    }
    else
    {
        res.json({
            message:'no user found',
        })
    }
}

module.exports.postUser=function postUser(req,res){
    users=req.body;
    res.send("Received Successfully")
}

module.exports.updateUser=async function updateUser(req,res){
    try{
    let id=req.params.id;
    let user=await usermodel.findById(id);
    let datatobeUpdated=req.body;
    if(user)
    {
        for(key in req.body)
        {
        user[key]=req.body[key];
        // res.send("Updated Successfully")
        }
        const updatedData=await user.save();
        res.json({
            message:'user updated succesfully',
            data:user,
        })
    }
    else{
        res.json({
            message:'user not found',
        })
    }
    }
    catch(err){
        res.json({
            message:err.message,
        })
    }

}

module.exports.deleteUser=async function deleteUser(req,res)
{
    let id=req.params.id;
    let user=await usermodel.findOneAndDelete(id);
    if(user)
    {
        res.json({
            message:"Deleted Successfully",
        }
        )
    }
    else
    {
        res.json({
            message:'user not found',
        })
    }
}



module.exports.updateProfileImage=function updateProfileImage(req,res){
    // console.log('ssssss')
    res.json({
        message:'file uploaded successfully'
    })
}

// function setCookies(req,res){
//     res.cookie('isLoggedIn',true,{maxAge:1000*60,secure:true,httpOnly:true})
//     res.send('Cookies Set')
// }
 

// function getCookies(req,res){
//     let cookies=req.cookie;
//     console.log(cookies);
//     res.send('cookies received')
// }
