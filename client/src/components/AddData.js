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
            ingredientCut: "",
            procedure: [],
            procedureNum: 0,
            procedureContent: ""
        }
    }

    // POST using Axios
    addNewRecipe = () => {
        Axios.post('https://nomnoms-backend.vercel.app/add-recipe', {
            recipeName: this.state.recipeName,
            ingredient: this.state.ingredient,
            procedure: this.state.procedure
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

    displayIngForm = e => {
        document.getElementById("addIng").style.display = "block"
        document.getElementById(e.target.id).style.display = "none"
    }

    hideIngForm = () => {
        document.getElementById("addIng").style.display = "none"
        document.getElementById("displayIng").style.display = "block"
    }

    submitIngredient = () => {
        const {ingredientUnit, ingredientQuantity, ingredientName, ingredientCut} = this.state
        const array = {
            ingredientName,
            ingredientQuantity,
            ingredientUnit,
            ingredientCut
        }
        this.setState({
            ingredient: [
                ...this.state.ingredient,
                array
            ]
        })
    }

    handleChangeProcedureNum = e => {
        const {value} = e.target
        this.setState({ procedureNum: value })
    }

    handleChangeProcedureContent = e => {
        const {value} = e.target
        this.setState({ procedureContent: value })
    }

    submitProcedure = () => {
        const {procedure, procedureNum, procedureContent} = this.state
        procedure[procedureNum] = procedureContent
        this.setState({ procedure })
    }

    displayProcForm = e => {
        document.getElementById("addProc").style.display = "block"
        document.getElementById(e.target.id).style.display = "none"
    }

    hideProcForm = () => {
        document.getElementById("addProc").style.display = "none"
        document.getElementById("displayProc").style.display = "block"
    }

    render() {
        const { ingredient, recipeName, ingredientUnit, ingredientQuantity, ingredientName, ingredientCut, procedureNum, procedureContent, procedure} = this.state
        return (
            <div className="addData">
                <div className="container">
                    <form onSubmit={this.addNewRecipe}>
                        <input id="recipeName" name="recipeName" placeholder="Type Recipe Name Here" value={recipeName} onChange={this.handleChangeRecipeName}/>
                        <div className="addForm">
                            <h3>Ingredient/s:</h3>
                            <input type="button" id="displayIng" value="+Add Ingredient" onClick={this.displayIngForm}/>
                            <div>{ // display added ingredient here
                                ingredient.map((val,key) => {
                                    return <div key={key} className="addedIngredient" >
                                        {val.ingredientQuantity} {val.ingredientUnit} {val.ingredientName} {val.ingredientCut} 
                                        <a href="#">Edit</a>
                                        <a href="#">Delete</a>
                                    </div>
                                })
                            }</div>
                            <form action="" id="addIng" style={{display: "none"}}>
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
                                <input type="button" value="close" onClick={this.hideIngForm}/>
                            </form>
                        </div>
                        <div className="addForm">
                            <h3>Procedure/s:</h3>
                            <input type="button" id="displayProc" value="+Add Procedure" onClick={this.displayProcForm}/>
                            <ol>{ // display added procedure here
                                procedure.map((val,key) => {
                                    return <li key={key} className="addedProcedure" >
                                        {val} 
                                        <a href="#">Edit</a>
                                        <a href="#">Delete</a>
                                    </li>
                                })
                            }</ol>
                            <form action="" id="addProc" style={{display: "none"}}>
                                <label>Procedure Number:</label>
                                <input type="number" name="procedureNum" value={procedureNum} onChange={this.handleChangeProcedureNum}/>
                                <br/>
                                <label>Procedure:</label>
                                <input type="text" name="procedureContent" value={procedureContent} onChange={this.handleChangeProcedureContent}/>
                                <br/>
                                <input type="button" value="add procedure" onClick={this.submitProcedure}/>
                                <input type="button" value="close" onClick={this.hideProcForm}/>
                            </form>
                        </div>
                        <input type="submit"/>
                        <Link to="/displayAll">Back</Link>
                    </form>
                </div>
            </div>
        )
    }
}