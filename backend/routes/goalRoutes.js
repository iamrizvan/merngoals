const express = require('express')
const { getGoals, setGoal, updateGoal, deleteGoal } = require('../controller/goalController')
const dotenv = require('dotenv').config()
const router = express.Router()

const app = express()
const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getGoals).post(protect, setGoal)
router.route('/:id').put(protect, updateGoal).delete(protect, deleteGoal)


module.exports = router