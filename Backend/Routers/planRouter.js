const express=require('express');
const planRouter=express.Router();
const {protectroute,isAuthorised}=require('../controller/authController')
const {getAllPlans,getPlan,createPlan,updatePlan,deletePlan,top3Plans}=require('../controller/planController')



planRouter
.route('/allPlans')
.get(getAllPlans)

planRouter
.route('/top3')
.get(top3Plans)


// check whether user logged in or not

planRouter.use(protectroute);
planRouter
.route('/plan/:id')
.get(getPlan)


//only give permission to admin and resturant owner
planRouter.use(isAuthorised(['admin','resturant owner']));
planRouter
.route('/crudPlan')
.post(createPlan)

planRouter
.route('/crudPlan/:id')
.patch(updatePlan)
.delete(deletePlan)


// top 3 plan
module.exports=planRouter;