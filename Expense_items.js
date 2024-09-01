import React from 'react';

function ExpenseItem({ expense }) {
    const handleDelete = async () => {
        try {
            await fetch(`http://localhost:5000/api/expenses/${expense._id}`, {
                method: 'DELETE'
            });
        } catch (err) {
            console.error('Failed to delete expense', err);
        }
    };

    return (
        <div>
            <h3>{expense.title}</h3>
            <p>Amount: {expense.amount}</p>
            <p>Category: {expense.category}</p>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
}

export default ExpenseItem;
