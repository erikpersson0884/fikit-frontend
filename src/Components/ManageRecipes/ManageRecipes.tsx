import React from "react";

import { RecipeT } from "../../types";
import ManageRecipe from "./ManageRecipe/ManageRecipe";
import AddRecipe from "./AddRecipe";
import "./ManageRecipes.css";

import ManageRecipesMenu from "./ManageRecipesMenu";

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



    const [activeRecipe, setActiveRecipe] = React.useState<RecipeT | null>(recipes[0]);

    return (
        <div className="manageRecipePage">
            <ManageRecipesMenu 
                activeRecipe={activeRecipe} 
                setActiveRecipe={setActiveRecipe} 
                recipes={recipes} 
                setRecipes={setRecipes} 
            />
            
            <div className="editRecipeContainer">
                <div className="editRecipeContainer">
                    {activeRecipe &&

                        <ManageRecipe recipe={activeRecipe} deleteRecipe={() => deleteRecipe(activeRecipe.id)} />
                    }
                </div>
                
            </div>

        </div>
    )
}

export default ManageRecipes;