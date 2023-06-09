import React, {Component} from "react"
import { Link } from "react-router-dom"
import Axios from 'axios'

export class AddData extends Component {
    constructor(){
        super()
        this.state = {
            recipeName: "",
            ingredient: [],
            ingredientName: "",
            ingredientQuantity: 0,
            ingredientUnit: "",
            ingredientCut: ""
        }
    }

    // POST using Axios
    addNewRecipe = () => {
        Axios.post('http://localhost:8080/add-recipe', {
            recipeName: this.state.recipeName,
            ingredient: this.state.ingredient
        })
    }

    // always make a separate component for reading values onchange
    handleChangeRecipeName = e => {
        const {value} = e.target
        this.setState({ recipeName: value })
    }

    handleChangeIngredientQuantity = e => {
        const {value} = e.target
        this.setState({ ingredientQuantity: value })
    }

    handleChangeIngredientUnit = e => {
        const {value} = e.target
        this.setState({ ingredientUnit: value })
    }

    handleChangeIngredientName = e => {
        const {value} = e.target
        this.setState({ ingredientName: value })
    }

    handleChangeIngredientCut = e => {
        const {value} = e.target
        this.setState({ ingredientCut: value })
    }

    submitIngredient = () => {
        const {ingredientUnit, ingredientQuantity, ingredientName, ingredientCut} = this.state
        this.setState({
            ingredient: [{
                ingredientName,
                ingredientQuantity,
                ingredientUnit,
                ingredientCut
            }]
        })
    }

    render() {
        const {recipeName, ingredientUnit, ingredientQuantity, ingredientName, ingredientCut} = this.state
        return (
            <div className="addData">
                <div className="container">
                    <form onSubmit={this.addNewRecipe}>
                        <input id="recipeName" name="recipeName" placeholder="Type Recipe Name Here" value={recipeName} onChange={this.handleChangeRecipeName}/>
                        <div className="addForm">
                            <h3>Ingredient/s:</h3>
                            <form action="" id="addIng">
                                <label>Quantity:</label>
                                <input type="number" name="ingredientQuantity" value={ingredientQuantity} onChange={this.handleChangeIngredientQuantity}/>
                                <br/>
                                <label>Unit:</label>
                                <input type="text" name="ingredientUnit" value={ingredientUnit} onChange={this.handleChangeIngredientUnit}/>
                                <br/>
                                <label>Ingredient:</label>
                                <input type="text" name="ingredientUnit" value={ingredientName} onChange={this.handleChangeIngredientName}/>
                                <br/>
                                <label>Cut: (Optional)</label>
                                <input type="text" name="ingredientUnit" value={ingredientCut} onChange={this.handleChangeIngredientCut}/>
                                <br/>
                                <input type="button" value="add ingredient" onClick={this.submitIngredient}/>
                                <input type="button" value="close"/>
                            </form>
                        </div>
                        {/*<div className="addForm">
                            <h3>Procedure/s:</h3>
                            <button onClick={
                                () =>
                                document.getElementById("addProc").style.display = "block"
                            }>+ Add Procedure</button>
                            <form action="" id="addProc" style={{display: "none"}}>
                                <input type="text" placeholder="Enter Procedure..."/>
                                <input type="submit"/>
                                <input type="button" onClick={
                                () =>
                                document.getElementById("addProc").style.display = "none"
                                } value="close"/>
                            </form>
                        </div>*/}
                        <input type="submit"/>
                        <Link to="/displayAll">Back</Link>
                    </form>
                </div>
            </div>
        )
    }
}