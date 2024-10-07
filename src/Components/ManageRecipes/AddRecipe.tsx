import React from "react";

interface AddRecipeProps {
    onClick: () => void;
}
const AddRecipe: React.FC<AddRecipeProps> = ({onClick}) => {
    return (
        <button className="addRecipeButton" onClick={onClick}>
            <p>Add Recipe</p>
            <img src="images/icons/add.svg" alt="add" />
        </button>
    )
}

export default AddRecipe;