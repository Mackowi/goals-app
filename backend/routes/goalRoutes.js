const express = require('express');
const router = express.Router();
const { 
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal
} = require('../controllers/goalController');
const { protect } = require('../middleware/authMiddleware');

// routes => /api/goals

router.route('/').get(protect, getGoals).post(protect, setGoal);
router.route('/:id').put(protect, updateGoal).delete(protect, deleteGoal);

module.exports = router


/* OLD ROUTES 
router.get('/', getGoals);
router.post('/', setGoal);
router.put('/:id', updateGoal);
router.delete('/:id', deleteGoal);
*/