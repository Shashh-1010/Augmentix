import React, { useState, useEffect } from 'react';
import ExpenseItem from './ExpenseItem';

function ExpenseList() {
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/expenses');
                const data = await response.json();
                setExpenses(data);
            } catch (err) {
                console.error('Failed to fetch expenses', err);
            }
        };
        fetchExpenses();
    }, []);

    return (
        <div>
            <h2>Expense List</h2>
            {expenses.map(expense => (
                <ExpenseItem key={expense._id} expense={expense} />
            ))}
        </div>
    );
}

export default ExpenseList;
