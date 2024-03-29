const asyncHandler = require('express-async-handler');
const Goal = require('../models/goalModel');
const User = require('../models/userModel');

const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  res.status(200).json(goals);
});

const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error('Please add a text field');
  }

  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id
  });
  res.status(200).json(goal);
});

const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error('Goal not found.');
  }

  if(!req.user) {
    res.status(401);
    throw new Error('User not found.');
  }

  // make sure goal user is the logged user
  if(goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not autorized.');
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true});

  res.status(200).json(updatedGoal);
});

const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if(!goal) {
    res.status(400);
    throw new Error('Goal not found.');
  }

  if(!req.user) {
    res.status(401);
    throw new Error('User not found.');
  }

  // make sure goal user is the logged user
  if(goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not autorized.');
  }

  await goal.deleteOne({ _id: req.params.id });
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
}