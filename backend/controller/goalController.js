const expressAsyncHandler = require("express-async-handler")
const Goal = require('../models/goalModel')
const User = require('../models/userModel')

// @desc     GET Goals
// @route    GET /api/goals
// @access   Private
const getGoals = expressAsyncHandler( async (req, res)=>{
    const goals = await Goal.find({user:req.user})
    res.status(200).json(goals)
})


// @desc     SET Goals
// @route    POST /api/goals
// @access   Private
const setGoal = expressAsyncHandler( async (req,res)=>{

    if(!req.body.text)
    {
        res.status(400)
        throw new Error('Please add a text field')
    }
    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })
    res.status(200).json(goal)
})



// @desc     Update Goals
// @route    PUT /api/goals/:id
// @access   Private
const updateGoal = expressAsyncHandler( async (req,res)=>{
    const goal = await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }

    const user = await User.findById(req.user.id)
    // check for user
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the goal user
    if(goal.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new:true,})
    res.status(200).json(updatedGoal)
})



// @desc     Delete Goals
// @route    Delete /api/goals/:id
// @access   Private
const deleteGoal = expressAsyncHandler( async (req,res)=>{
    const goal = await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }
    const user = await User.findById(req.user.id)
    // check for user
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the goal user
    if(goal.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }
    const deletedGoal = await Goal.findByIdAndDelete(req.params.id)
    res.status(200).json(deletedGoal)
})  


module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
}