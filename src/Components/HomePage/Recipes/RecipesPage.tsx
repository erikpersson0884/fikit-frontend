import "./Recipes.css";
//import recipes  from "./recipe.json";


import Recipe from "./Recipe/Recipe";
import { useEffect, useState } from "react";
import { RecipeT } from "../../../types";



const RecipesPage = () => {
    const [recipes, setRecipes] = useState<RecipeT[]>([]);
    useEffect(()=>{
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

    fetch(API_BASE_URL + '/api/recipe/getAllRecipes')
    .then(response => response.json()).then(data => {   
        setRecipes(data);
    });
    },[]);
    
    let [selectedRecipe, setSelectedRecipe] = useState<RecipeT | undefined>(undefined);
    
    
    return (
        <div className='recepies'>
            {selectedRecipe ? (
            <Recipe recipe={selectedRecipe} unSelect={() => setSelectedRecipe(undefined)} />
            ) : (
            recipes.map((recipe: RecipeT, recipeKey: number) => (
                <RecipePreview recipe={recipe} key={recipeKey} onClick={() => setSelectedRecipe(recipe)}/>
            ))
            )}
        </div>
    )
}

const RecipePreview = ({recipe, onClick}:{recipe:RecipeT, onClick: any})=>{

    return (
        <div className="recipePreview" onClick={onClick}>
            <div className='pin'></div>
            <p>{recipe.name}</p>
        </div>
    )
}

export default RecipesPage;