import React, { useState } from 'react';

function ExpenseForm() {
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newExpense = { title, amount, category };
        
        try {
            const response = await fetch('http://localhost:5000/api/expenses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newExpense)
            });
            if (response.ok) {
                setTitle('');
                setAmount('');
                setCategory('');
            }
        } catch (err) {
            console.error('Failed to save expense', err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="Expense title" 
            />
            <input 
                type="number" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)} 
                placeholder="Amount" 
            />
            <input 
                type="text" 
                value={category} 
                onChange={(e) => setCategory(e.target.value)} 
                placeholder="Category" 
            />
            <button type="submit">Add Expense</button>
        </form>
    );
}

export default ExpenseForm;
