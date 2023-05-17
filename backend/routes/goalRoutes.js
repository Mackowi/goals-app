const express = require('express');
const router = express.Router();
const { 
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal
} = require('../controllers/goalController');

// routes => /api/goals

/* OLD ROUTES 
router.get('/', getGoals);
router.post('/', setGoal);
router.put('/:id', updateGoal);
router.delete('/:id', deleteGoal);
*/

// NEW SHORTER ROUTES
router.route('/').get(getGoals).post(setGoal);
router.route('/:id').put(updateGoal).delete(deleteGoal);



module.exports = router