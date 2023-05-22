import React, {Component} from "react"
import './Recipes.css'
import Axios from 'axios'
import { useLocation } from 'react-router-dom';

function Recipes(){
    const location = useLocation();
    const data = location.state.recipe
    return (
        <div className="recipes">
            <div className="container">
            <h1>{data.recipeName}</h1>
            <div className="recipe">
                <div className="recipeContent">
                    <h3>Ingredients:</h3>
                    {data.ingredient.map((val,key) => {
                        return <li key={key}>{val.ingredientQuantity +" "
                        + val.ingredientUnit +" "+ val.ingredientName +" "
                        + val.ingredientCut}</li>
                    })}                    
                </div>
                <div className="recipeContent" id="procedures">
                    <h3>Procedure:</h3>
                    {data.procedure.map((val,key) => {
                        return <li key={key}>{val}</li>
                    })}
                </div>
            </div>
                <img src="img/chicken-inasal.png" alt="chicken-inasal"/>
            </div>
        </div>
    )
}

export default Recipes