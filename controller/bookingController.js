// This is your test secret API key.
let SK="sk_test_51LI5XNSDIUNe90tXhCjWa1WdIn04ZWurgYHRIroCUZirBvZ8pEnNzZO4VuJoYAbzlb57M2PalaWESNHUXJqmcg3H00OOfpA0Yw";
const stripe = require('stripe')(SK);
const planModel=require('../models/planModel');
const userModel=require('../models/usermodel');

module.exports.createSession=async function createSession(req, res)
{
    try
    {
        let userId=req.id;
        let planId=req.params.id;

        let user=await userModel.findById(userId);
        let plan=await planModel.findById(planId);
        
        const session = await stripe.checkout.sessions.create({
        payment_method_types:['card'],
        customer_email:user.email,
        client_reference_id:plan.id,
        line_items: [
        {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        name:plan.name,
        description:plan.description,
        amount:plan.price,
        currency: 'inr',
        quantity: 1,
        },
    ],
    success_url:`${req.protocol}://${req.get('host')}/profile`,
    cancel_url:`${req.protocol}://${req.get('host')}/profile`,
     });
     res.redirect(200,success_url)
     res.status(200).json({
        message:payment,
        status:'success',
        session
     })
    }
    catch(err)
    {
      res.status(500).json({
        message:err.message
      });
    }
}