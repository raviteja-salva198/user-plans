// routes/planRoutes.js
const express = require('express');
const { buyPlan, getCurrentPlan } = require('../controllers/planController');

const router = express.Router();

// Route to buy or update a plan
router.post('/buy-plan/:userId', buyPlan);

// Route to get current plan
router.get('/current-plan/:userId', getCurrentPlan);

module.exports = router;
