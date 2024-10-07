import React from 'react';

import { RecipeT, Ingredient } from '../../../types';

interface ManageRecipeProps {
    recipe: RecipeT;
}

const ManageRecipe: React.FC<ManageRecipeProps & { deleteRecipe: () => void }> = ({ recipe, deleteRecipe }) => {
    const [recipeName, setRecipeName] = React.useState<string>(recipe.name);
    const [recipeAuthor, setRecipeAuthor] = React.useState<string>(recipe.author);
    const [ingredients, setIngredients] = React.useState<Ingredient[]>(recipe.ingredients);
    const [instructions, setInstructions] = React.useState<string[]>(recipe.instructions);
    const [updateSuccess, setUpdateSuccess] = React.useState<boolean>(false);
    const [updateFailure, setUpdateFailure] = React.useState<boolean>(false);

    const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    function handleUpdateRecipe() {
        fetch(`${VITE_API_BASE_URL}/api/recipes/updateRecipe`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                adminKey: localStorage.getItem('adminKey'),
                recipe: {
                    id: recipe.id,
                    name: recipeName,
                    author: recipeAuthor,
                    instructions: instructions,
                    ingredients: ingredients,
                }
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            } else {
                return response.json();
            }
        })
        .then(() => {
            setUpdateSuccess(true);
            setTimeout(() => setUpdateSuccess(false), 100); // Reset after 1 second
        })
        .catch(error => {
            console.error('Error updating recipe:', error);
            setUpdateFailure(true);
            setTimeout(() => setUpdateFailure(false), 100); // Reset after 1 second
        });
    }

    function handleAddInstruction() {
        setInstructions([...instructions, '']);
    }

    function handleDeleteInstruction(index: number) {
        const newInstructions = instructions.filter((_, i) => i !== index);
        setInstructions(newInstructions)
    }

    function handleAddIngredient() {
        setIngredients([...ingredients, { name: '', weight: 0, density: 0, unit: 'g', packageSize: 0 }]);
    }

    function handleDeleteIngredient(index: number) {
        const newIngredients = ingredients.filter((_, i) => i !== index);
        setIngredients(newIngredients);
    }

    return (
        <div className={`
            manageRecipe 
            manageRecipe-${recipe.id} 
            ${updateSuccess ? 'blink-green' : ''}
            ${updateFailure ? 'blink-red' : ''}
        `}>
            <header>
                <div className='headerInputs'>
                    <div className='headerInput'>
                        <label htmlFor={`manageRecipeName-${recipe.id}`}>Recipe Name</label>
                        <input id={`manageRecipeName-${recipe.id}`} type="text" value={recipeName} onChange={(e) => setRecipeName(e.target.value)} />
                    </div>
 
                    <div className='headerInput'>
                        <label htmlFor={`manageRecipeAuthor-${recipe.id}`}>Recipe Author</label>
                        <input id={`manageRecipeAuthor-${recipe.id}`} type="text" value={recipeAuthor} onChange={(e) => setRecipeAuthor(e.target.value)} />
                    </div>
                </div>
                <div className='actionButtons'>
                    <button className='updateRecipeButton addButton' onClick={handleUpdateRecipe}>Update Recipe</button>
                    <button className='deleteRecipeButton deleteButton' onClick={deleteRecipe}>Delete Recipe</button>
                </div>
            </header>

            {instructions && 
                <div className='instructions'>
                    <h2>Instructions</h2>
                    <ol>
                        {instructions.map((instruction, index) => (
                            <li key={index}>
                                <textarea value={instruction} onChange={(e) => {
                                    const newInstructions = [...instructions];
                                    newInstructions[index] = e.target.value;
                                    setInstructions(newInstructions);
                                }} />

                                <button className='deleteInstructionButton deleteButton' onClick={() => handleDeleteInstruction(index)}>Delete</button>
                            </li>
                        ))}
                    </ol>
                </div>
            }

            <button className='addInstructionButton addButton' onClick={handleAddInstruction}>Add Instruction</button>

            {ingredients.length > 0 &&
            <div className='ingredientsDiv'>
                <h2>Ingredients</h2>
                <div className='ingredientHeader'>
                    <label>Ingredient</label>
                    <label>Weight (g)</label>
                    <label>Density (g/ml)</label>
                    <label>Unit</label>
                    <label>Package Size</label>
                </div>
                <ul className='noUlFormatting ingredients'>
                    {ingredients.map((ingredient, index) => (
                        <li key={index}>
                            <input 
                                type="text"
                                value={ingredient.name}
                                placeholder='Ingredient'
                                onChange={(e) => {
                                    const newIngredients = [...ingredients];
                                    newIngredients[index].name = e.target.value;
                                    setIngredients(newIngredients);
                                }}
                            />
                            <input 
                                type="number" 
                                value={ingredient.weight} 
                                placeholder='Weight'
                                onChange={(e) => {
                                    const newIngredients = [...ingredients];
                                    newIngredients[index].weight = Number(e.target.value);
                                    setIngredients(newIngredients);
                            }} />

                            <input 
                                type="number" 
                                value={ingredient.density} 
                                placeholder='Density'
                                onChange={(e) => {
                                    const newIngredients = [...ingredients];
                                    newIngredients[index].density = Number(e.target.value);
                                    setIngredients(newIngredients);
                            }} />

                            <select 
                                value={ingredient.unit} 
                                onChange={(e) => {
                                    const newIngredients = [...ingredients];
                                    newIngredients[index].unit = e.target.value;
                                    setIngredients(newIngredients);
                            }}>
                                <option value='g'>g</option>
                                <option value='ml'>ml</option>
                                <option value='tsk'>tsk</option>
                                <option value='msk'>msk</option>
                                <option value='dl'>dl</option>
                            </select>
                            
                            <input 
                                type="number" 
                                value={ingredient.packageSize} 
                                placeholder='Package Size'
                                onChange={(e) => {
                                    const newIngredients = [...ingredients];
                                    newIngredients[index].packageSize = Number(e.target.value);
                                    setIngredients(newIngredients);
                            }} />

                            
                            <button className='deleteIngredientButton deleteButton' onClick={() => handleDeleteIngredient(index)}>Delete</button>
                            
                        </li>
                    ))}
                </ul>

            </div>
        }   
            <button className='addIngredientButton' onClick={handleAddIngredient}>Add Ingredient</button>

        </div>
    );
}

    



export default ManageRecipe;