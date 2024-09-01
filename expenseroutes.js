const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

router.post('/', async (req, res) => {
    const { title, amount, category } = req.body;
    const newExpense = new Expense({ title, amount, category });
    try {
        const savedExpense = await newExpense.save();
        res.json(savedExpense);
    } catch (err) {
        res.status(500).json({ error: 'Failed to save expense' });
    }
});

router.get('/', async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.json(expenses);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch expenses' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedExpense = await Expense.findByIdAndDelete(req.params.id);
        res.json(deletedExpense);
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete expense' });
    }
});

module.exports = router;
