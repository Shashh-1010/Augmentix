import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function RecipeForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        ingredients: '',
        instructions: '',
        category: '',
    });

    useEffect(() => {
        if (id) {
            fetch(`/api/recipes/${id}`)
                .then((res) => res.json())
                .then((data) => setFormData(data))
                .catch((err) => console.error(err));
        }
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const method = id ? 'PUT' : 'POST';
        fetch(`/api/recipes${id ? `/${id}` : ''}`, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        })
        .then(() => navigate('/'))
        .catch((err) => console.error(err));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Recipe Title"
                required
            />
            <textarea
                name="ingredients"
                value={formData.ingredients}
                onChange={handleChange}
                placeholder="Ingredients"
                required
            />
            <textarea
                name="instructions"
                value={formData.instructions}
                onChange={handleChange}
                placeholder="Instructions"
                required
            />
            <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Category"
                required
            />
            <button type="submit">Save Recipe</button>
        </form>
    );
}

export default RecipeForm;
