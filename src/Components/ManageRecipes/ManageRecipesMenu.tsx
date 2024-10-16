import React from 'react';
import { RecipeT } from '../../types';

interface ManageRecipesMenuProps {
    activeRecipe: RecipeT | null;
    setActiveRecipe: React.Dispatch<React.SetStateAction<RecipeT | null>>;
    recipes: RecipeT[];
    setRecipes: React.Dispatch<React.SetStateAction<RecipeT[]>>;
}

const ManageRecipesMenu: React.FC<ManageRecipesMenuProps> = ({activeRecipe, setActiveRecipe, recipes, setRecipes}) => {

    const addRecipe = () => {
        fetch(`${import.meta.env.VITE_API_BASE_URL}/api/recipes/addRecipe`, {
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
        <ul className="manageRecipesMenu sidebar noUlFormatting">
            {
                recipes.map((recipe, index) => (
                    <li key={index} onClick={() => setActiveRecipe(recipe)}>{recipe.name}</li>
                ))
            }
            <button onClick={addRecipe}>Add Recipe</button>
        </ul>
    )
}

export default ManageRecipesMenu;