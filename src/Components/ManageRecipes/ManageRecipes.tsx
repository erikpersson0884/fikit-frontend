import React from "react";

import { RecipeT } from "../../types";
import ManageRecipe from "./ManageRecipe/ManageRecipe";
import AddRecipe from "./AddRecipe";
import "./ManageRecipes.css";

interface ManageRecipesProps {
    recipes: RecipeT[];
    setRecipes: React.Dispatch<React.SetStateAction<RecipeT[]>>;
}

const ManageRecipes: React.FC<ManageRecipesProps> = ({recipes, setRecipes}) => {
    const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

    const deleteRecipe = (recipeId: string) => {
        fetch(`${VITE_API_BASE_URL}/api/recipes/deleteRecipe`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                adminKey: localStorage.getItem('adminKey'),
                recipeId: recipeId,
            }),
        }).then(response => response.json())
        .then(() => {
            const newRecipes = recipes.filter(r => r.id !== recipeId);
            setRecipes(newRecipes);
        });
    }

    const addRecipe = () => {
        fetch(`${VITE_API_BASE_URL}/api/recipes/addRecipe`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                adminKey: localStorage.getItem('adminKey'),
            }),
        }).then(response => response.json())
        .then((newRecipe: RecipeT) => {
            setRecipes([...recipes, newRecipe]);
        });
    }

    return (
        <div className="manageRecipePage">
            <h1>Manage Recipes</h1>

            <div className="recipes">
            {
                recipes.map((recipe, index) => (
                    <ManageRecipe key={index} recipe={recipe} deleteRecipe={() => deleteRecipe(recipe.id)} />
                ))
            }
            </div>

            <AddRecipe onClick={addRecipe} />

        </div>
    )
}

export default ManageRecipes;