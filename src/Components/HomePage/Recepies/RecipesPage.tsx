import "./Recipes.css";
//import recipes  from "./recipe.json";


import Recipe from "./Recipe/Recipe";
import { useEffect, useState } from "react";
import { RecipeT } from "../../../types";



const RecipesPage = () => {
    const [recipes, setRecipes] = useState<RecipeT[]>([]);
    console.log(recipes);
    useEffect(()=>{
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

    fetch(API_BASE_URL + '/api/recipe/getAllRecipes')
    .then(response => response.json()).then(data => {   
        console.log(data);
        setRecipes(data);
    });
    },[]);
    
    
    
    return (
        <div className='recepies'>
            {recipes.map((recipe,recipeKey)=>
                <Recipe key={recipeKey} recipe={recipe} />
            )}
        </div>
    )
}

export default RecipesPage;