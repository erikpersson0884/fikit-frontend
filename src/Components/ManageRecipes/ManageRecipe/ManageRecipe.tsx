import React from 'react';
import './ManageRecipe.css';

import { RecipeT, Ingredient } from '../../../types';
import PopupButton from '../../PopupButton/PopupButton';

interface ManageRecipeProps {
    recipe: RecipeT;
}

const ManageRecipe: React.FC<ManageRecipeProps & { deleteRecipe: () => void }> = ({ recipe, deleteRecipe }) => {
    const originalRecipe = { 
        ...recipe, 
        ingredients: recipe.ingredients.map(ingredient => ({ ...ingredient })), 
        instructions: [...recipe.instructions] 
    };

    const [recipeName, setRecipeName] = React.useState<string>(recipe.name);
    const [recipeAuthor, setRecipeAuthor] = React.useState<string>(recipe.author);
    const [ingredients, setIngredients] = React.useState<Ingredient[]>(recipe.ingredients);
    const [instructions, setInstructions] = React.useState<string[]>(recipe.instructions);
    const [updateSuccess, setUpdateSuccess] = React.useState<boolean>(false);
    const [updateFailure, setUpdateFailure] = React.useState<boolean>(false);

    React.useEffect(() => {
        setRecipeName(recipe.name);
        setRecipeAuthor(recipe.author);
        setIngredients(recipe.ingredients);
        setInstructions(recipe.instructions);
    }, [recipe]);

    const [recipeIsChanged, setRecipeIsChanged] = React.useState<boolean>(false);

    React.useEffect(() => {
        setRecipeIsChanged(
            recipeName !== originalRecipe.name ||
            recipeAuthor !== originalRecipe.author ||
            ingredients.length !== originalRecipe.ingredients.length || // Check for length difference first
            !ingredients.every((ingredient, index) => {
                const originalIngredient = originalRecipe.ingredients[index];
                return (
                    originalIngredient &&
                    ingredient.name === originalIngredient.name &&
                    ingredient.weight === originalIngredient.weight &&
                    ingredient.density === originalIngredient.density &&
                    ingredient.unit === originalIngredient.unit &&
                    ingredient.packageSize === originalIngredient.packageSize
                );
            }) ||
            !instructions.every((instruction, index) => instruction === originalRecipe.instructions[index])
        );

        
    }, [recipeName, recipeAuthor, ingredients, instructions]);

    // does not update when ingredients are changed, probably since 
    
    
    


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

    const [showDeleteRecipePopup, setShowDeleteRecipePopup] = React.useState<boolean>(false);

    return (
        <div className={`
            manageRecipe 
            manageRecipe-${recipe.id} 
            ${updateSuccess ? 'blink-green' : ''}
            ${updateFailure ? 'blink-red' : ''}
        `}>

            <button className='deleteRecipeButton noButtonFormatting deleteButton' onClick={deleteRecipe}>
                <img src='images/icons/delete.svg' alt='Delete Recipe' />
            </button>

            <PopupButton show={showDeleteRecipePopup} text='Are you sure you want to delete this recipe?' onClick={deleteRecipe} hide={() => setShowDeleteRecipePopup(false)} />

            <header>
                <div className='headerInputsDiv'>
                    <div className='inputDiv'>
                        <label htmlFor={`manageRecipeName-${recipe.id}`}>Recipe Name</label>
                        <input id={`manageRecipeName-${recipe.id}`} type="text" value={recipeName} onChange={(e) => setRecipeName(e.target.value)} />
                    </div>

                    <div className='inputDiv'>
                        <label htmlFor={`manageRecipeAuthor-${recipe.id}`}>Recipe Author</label>
                        <input id={`manageRecipeAuthor-${recipe.id}`} type="text" value={recipeAuthor} onChange={(e) => setRecipeAuthor(e.target.value)} />
                    </div>
                </div>
            </header>

            <hr />

            <div className='instructions'>
                <h2>Instructions</h2>
                { instructions.length > 0 ?
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
                :
                    <h4>Currently, there are no instructions</h4>
                }
                <button className='addButton' onClick={handleAddInstruction}>Add Instruction</button>
            </div>
            

            <div className='ingredientsDiv'>
                <h2>Ingredients</h2>

                {ingredients.length > 0 ?
                <>
                    <header className='ingredientHeader'>
                        <label>Ingredient</label>
                        <label>Weight (g)</label>
                        <label>Density (g/ml)</label>
                        <label>Unit</label>
                        <label>Package Size</label>
                    </header>
                    <ul className='noUlFormatting ingredientsList'>
                        {ingredients.map((ingredient, index) => (
                        <li key={index}>
                            <input 
                                type="text"
                                value={ingredient.name}
                                placeholder='Ingredient'
                                onChange={(e) => {
                                    const newIngredients = ingredients.map((ing, i) => 
                                        i === index ? { ...ing, name: e.target.value } : ing
                                    );
                                    setIngredients(newIngredients); // Create a new array reference
                                }}
                            />
                            <input 
                                type="number" 
                                value={ingredient.weight} 
                                placeholder='Weight'
                                onChange={(e) => {
                                    const newIngredients = ingredients.map((ing, i) => 
                                        i === index ? { ...ing, weight: Number(e.target.value) } : ing
                                    );
                                    setIngredients(newIngredients); // Create a new array reference
                                }} 
                            />
                            <input 
                                type="number" 
                                value={ingredient.density} 
                                placeholder='Density'
                                onChange={(e) => {
                                    const newIngredients = ingredients.map((ing, i) => 
                                        i === index ? { ...ing, density: Number(e.target.value) } : ing
                                    );
                                    setIngredients(newIngredients); // Create a new array reference
                                }} 
                            />
                            <select 
                                value={ingredient.unit} 
                                onChange={(e) => {
                                    const newIngredients = ingredients.map((ing, i) => 
                                        i === index ? { ...ing, unit: e.target.value } : ing
                                    );
                                    setIngredients(newIngredients); // Create a new array reference
                                }}
                                >
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
                                        const newIngredients = ingredients.map((ing, i) => 
                                            i === index ? { ...ing, packageSize: Number(e.target.value) } : ing
                                        );
                                        setIngredients(newIngredients); // Create a new array reference
                                    }} 
                                />
                                <button className='deleteIngredientButton deleteButton' onClick={() => handleDeleteIngredient(index)}>Delete</button>
                            </li>
                        ))}
                    </ul>

                </>
                :
                    <h4>Currently, there are no ingredients</h4>
                }

                <button className='addIngredientButton' onClick={handleAddIngredient}>Add Ingredient</button>
            </div>

                <div className='actionButtons'>
                    <button className={`${recipeIsChanged ? 'updateRecipeButton' : ''} addButton`} onClick={handleUpdateRecipe}>Update Recipe</button>
                </div>
            
        </div>
    );
}

    



export default ManageRecipe;