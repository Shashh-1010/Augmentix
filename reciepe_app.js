import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RecipeList from './RecipeList';
import RecipeForm from './RecipeForm';

function App() {
    return (
        <Router>
            <div className="App">
                <h1>Recipe Sharing Platform</h1>
                <Routes>
                    <Route path="/" element={<RecipeList />} />
                    <Route path="/create" element={<RecipeForm />} />
                    <Route path="/edit/:id" element={<RecipeForm />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
