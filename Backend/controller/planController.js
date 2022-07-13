const planModel = require("../models/planModel");

module.exports.getAllPlans = async function getAllPlans(req, res) {
  try {
    let plans = await planModel.find();
    if (plans) {
      return res.json({
        message: "all plans retrieved",
        data: plans,
      });
    } else {
      res.json({
        message: "no plans available",
      });
    }
  } catch (err) {
    return res.json({
      message: err.message,
    });
  }
};

module.exports.getPlan = async function (req, res) {
  try {
    let id = req.params.id;
    let plan = await planModel.findById(id);
    if (plan) {
      return res.json({
        message: "all plans retrieved",
        data: plan,
      });
    } else {
      res.json({
        message: "no plans available",
      });
    }
  } catch (err) {
    return res.json({
      message: err.message,
    });
  }
};

module.exports.createPlan = async function createPlan(req, res) {
  try {
    let planData = req.body;
    
    let plan = await planModel.create(planData);
    return res.json({
      message: "plan created successfully",
      data: plan,
    });
  } catch (err) {
    return res.json({
      message: err.message,
    });
  }
};

module.exports.updatePlan = async function updatePlan(req, res) {
  try {
    let id = req.params.id;
    let data = req.body;
    // console.log('tcvbjklde2de2de2')
    let plan = await planModel.findById(id);
    if (plan) {
      for (keys in data) {
        plan[keys] = data[keys];
      }
      await plan.save();
      return res.json({
        message: "plan updated successfully",
        data: plan,
      });
    } else {
      res.json({
        message: "plan not found",
      });
    }
  } catch (err) {
    return res.json({
      message: err.message,
    });
  }
};

module.exports.deletePlan = async function deletePlan(req, res) {
  try {
    let id = req.params.id;
    let plan = await planModel.findByIdAndDelete(id);
    return res.json({
      message: "plan deleted successfully",
      data: plan,
    });
  } catch (err) {
    return res.json({
      message: err.message,
    });
  }
};

// get top 3 plans

module.exports.top3Plans=async function top3Plans(req,res){
    try{
        const plans=await planModel.find().sort({
            ratingsAverage:-1
        }).limit(3);
        return res.json({
            message:'top 3 plans',
            data:plans
        })
    }
    catch(err)
    {
        return res.json({
            message:err.message
        })
    }
}