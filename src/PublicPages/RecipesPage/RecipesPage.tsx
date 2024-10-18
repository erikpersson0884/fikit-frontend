import "./Recipes.css";
//import recipes  from "./recipe.json";


import Recipe from "./Recipe/Recipe";
import { useState } from "react";
import { RecipeT } from "../../../types";

interface RecipePreviewProps {
    recipes: RecipeT[];
}

const RecipesPage: React.FC<RecipePreviewProps> = ({recipes}) => {
    
    let [selectedRecipe, setSelectedRecipe] = useState<RecipeT | undefined>(undefined);

    console.log(recipes);
    
    
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