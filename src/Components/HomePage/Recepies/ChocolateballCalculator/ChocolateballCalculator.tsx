import React from 'react';
import './ChocolateballCalculator.css';

import { Recipe, Ingredient } from '../../../../types';

const ChocolateballCalculator = () => {

    // https://receptfavoriter.se/matartiklar/matt-och-vikt-pa-olika-livsmedel.html

    // RECEPT
    /// https://www.arla.se/recept/chokladbollar/

    const [amountOfBalls, setAmountOfBalls] = React.useState<number>(250);

    const recepie: Recipe = {
        name: "Chokladbollar",
        ingredients: [
            {
                name: "Havregryn", 
                weight: 28.2, 
                unit: "dl",
                density: 1, // g/ml
                packageSize: 1500
            },
            {
                name: "Socker", 
                weight: 7, 
                unit: "dl",
                density: 0.8,
                packageSize: 2000
            },
            {
                name: "Kakao", 
                weight: 1.07, 
                unit: "msk",
                density: 0.4,
                packageSize: 250
            },
            {
                name: "Kaffe", 
                weight: 0.68, 
                unit: "msk",
                density: 0.38,
                packageSize: NaN
            },
            {
                name: "Smör", 
                weight: 8.824, 
                unit: "g",
                density: 0.95,
                packageSize: 500
            },
            {
                name: "Vaniljsocker", 
                weight: 0.178, 
                unit: "tsk",
                density: 0.6,
                packageSize: 140
            },
            {
                name: "Karamellfärg",
                weight: 0.02,
                unit: "ml",
                density: 1,
                packageSize: 30
            }
        ]
    }

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAmountOfBalls(Number(event.target.value));
        localStorage.setItem("amountOfBalls", event.target.value);
        console.log(getIngredientAmount(recepie.ingredients[0]));
    }

    function calculateAmountOfIngredient(weight: number, density: number) {
        let amount = {
            grams: 0,
            ml: 0,
            tsk: 0,
            msk: 0,
            dl: 0
        };
    
        const numberOfDecimals: number = 2;
        
        amount.grams = Number((weight*amountOfBalls).toFixed(numberOfDecimals));

        let volume = weight / density;
        amount.ml = Number(volume.toFixed(numberOfDecimals));

        amount.tsk = Number(((amount.ml / 5 *amountOfBalls)).toFixed(numberOfDecimals));
        amount.msk = Number(((amount.ml / 15 *amountOfBalls)).toFixed(numberOfDecimals));
        amount.dl = Number(((amount.ml / 100 * amountOfBalls)).toFixed(numberOfDecimals));
    
        return amount;
    }

    function getIngredientAmount(ingredient: Ingredient): string {
        let amount = calculateAmountOfIngredient(ingredient.weight, ingredient.density);
        amount;

        if (ingredient.unit === "g") {
            return (amount.grams + " g");
        } else if (ingredient.unit === "ml") {
            return (amount.ml + " ml");
        } else if (ingredient.unit === "tsk") {
            return (amount.tsk + " tsk");
        }
        else if (ingredient.unit === "msk") {
            return (amount.msk + " msk");
        }
        else if (ingredient.unit === "dl") {
            return (amount.dl + " dl");
        }
        else {
            throw new Error("Invalid unit");
        }
    }


    return (
        <div className='chocolateballCalculator'>
            <h1>Chokladbollskalkylatorn 3000</h1>
            <div>
                <p>Skapad av HOM BRE, kodad av Göken </p>
            </div>

            <div className='recepieInputDiv'>
                <label>Antal bollar:</label>
                <input type="number" id="antalBollar" value={amountOfBalls} onChange={handleAmountChange} />
                <p>st</p>
            </div>

            <div className='recepie'>
                <header className="recepieIngredient">
                    <h4>Ingredienser</h4>
                    <h4>Mängd</h4>
                    <h4>Vikt</h4>
                    <h4>Paket</h4>
                    <h4>Paketstorlek</h4>
                </header>
                {
                    recepie.ingredients.map((ingredient, index) => {
                        const weight = ingredient.weight * amountOfBalls;
                        let weightString = "";
                        if (weight > 1000) weightString = (weight / 1000).toFixed(2) + " kg";
                        else weightString = weight.toFixed(2) + " g";

                        let numberOfPackagesString = "";
                        if (isNaN(ingredient.packageSize)) numberOfPackagesString = "N/A";
                        else {
                            const numberOfPackages = weight / ingredient.packageSize;
                            numberOfPackagesString = Math.ceil(numberOfPackages).toString();
                            numberOfPackagesString += " st";
                        }

                        let packageSizeString = "";
                        if (isNaN(ingredient.packageSize)) packageSizeString = "N/A";
                        else {
                            packageSizeString = ingredient.packageSize + " g";
                        }
                        
                        return (
                            <div className='recepieIngredient' key={index}>
                                <p>{ingredient.name}</p>
                                <p>{getIngredientAmount(ingredient)}</p>
                                <p>{weightString}</p>
                                <p>{numberOfPackagesString}</p>
                                <p>{packageSizeString}</p>
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}

export default ChocolateballCalculator;