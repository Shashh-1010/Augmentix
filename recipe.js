import React from 'react';

function Recipe({ title, ingredients, instructions, category }) {
    return (
        <div>
            <h2>{title}</h2>
            <p>Category: {category}</p>
            <h3>Ingredients</h3>
            <p>{ingredients}</p>
            <h3>Instructions</h3>
            <p>{instructions}</p>
        </div>
    );
}

export default Recipe;
