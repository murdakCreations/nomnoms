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
            procedureContent: "",
            currentIndexIng: 0,
            ingredientNameEdit: "",
            ingredientQuantityEdit: 0,
            ingredientUnitEdit: "",
            ingredientCutEdit: ""
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

    displayIngForm = () => {
        const {ingredientName,
        ingredientQuantity,
        ingredientUnit,
        ingredientCut} = this.state
        const mainContainer = document.getElementById("addIngForm")
        
        // Create sub container with id
        const subContainer = document.createElement('div')
        subContainer.id = 'addIngSubContainer'
        mainContainer.appendChild(subContainer);
        
        const container = document.getElementById("addIngSubContainer")
        container.innerHTML = ""
        
        // Create multiple input elements
        var values = [ingredientName,
            ingredientQuantity,
            ingredientUnit,
            ingredientCut];

        var labels = ["Ingredient Name: ",
            "Ingredient Quantity: ",
            "Ingredient Unit: ",
            "Ingredient Cut: "];

        for(var i = 0; i < values.length; i += 1) {
            var lbl = document.createElement("label")
            lbl.innerHTML = labels[i]
            container.appendChild(lbl);
            
            var div = document.createElement("input")
            div.value = values[i]
            if(i == 0) {
                div.addEventListener('change', this.handleChangeIngredientName)
            }
            if(i == 1) {
                div.addEventListener('change', this.handleChangeIngredientQuantity)
            }
            if(i == 2) {
                div.addEventListener('change', this.handleChangeIngredientUnit)
            }
            if(i == 3) {
                div.addEventListener('change', this.handleChangeIngredientCut)
            }
            container.appendChild(div);

            var br = document.createElement("br")
            container.appendChild(br);
        }

        // Set up the button
        const btn = document.createElement('input')
        btn.type = 'button'
        btn.value = 'Add Ingredient'
        btn.addEventListener('click', this.submitIngredient);
        container.appendChild(btn);
        const closeBtn = document.createElement('input')
        closeBtn.type = 'button'
        closeBtn.value = 'Close'
        closeBtn.addEventListener('click', this.hideIngForm);
        container.appendChild(closeBtn);

        // hide add ing button
        const addIngBtn = document.getElementById("displayIng")
        addIngBtn.style.visibility = "hidden"
    }

    hideIngForm = () => {
        const container = document.getElementById("addIngSubContainer")
        container.innerHTML = ""

        // unhide add ing button
        const addIngBtn = document.getElementById("displayIng")
        addIngBtn.style.visibility = "visible"
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

    handleDelIng = (index) => {
        const {ingredient} = this.state
        ingredient.splice(index, 1)
        this.setState({ingredient})
        const editForm = document.getElementById('subContainer')
        editForm.innerHTML = ""
    }

    handleChangeIngredientNameEdit = e => {
        const {value} = e.target
        this.setState({ ingredientNameEdit: value })
    }

    handleChangeIngredientUnitEdit = e => {
        const {value} = e.target
        this.setState({ ingredientUnitEdit: value })
    }

    handleChangeIngredientQuantityEdit = e => {
        const {value} = e.target
        this.setState({ ingredientQuantityEdit: value })
    }

    handleChangeIngredientCutEdit = e => {
        const {value} = e.target
        this.setState({ ingredientCutEdit: value })
    }
    
    saveOnPageEditIng = () => {
        const {ingredientUnit, ingredientQuantity, ingredientName, ingredientCut,
            ingredientNameEdit,ingredientQuantityEdit,
        ingredientUnitEdit,ingredientCutEdit, ingredient, currentIndexIng} = this.state
        
        // check if edit variable is empty or the value hasn't change
        
        if(ingredientCutEdit != "") {
            this.setState({
                ingredientCut: ingredientCutEdit
            })
        }
        if(ingredientNameEdit != "") {
            this.setState({
                ingredientName: ingredientNameEdit
            })
        }
        if(ingredientQuantityEdit != "") {
            this.setState({
                ingredientQuantity: ingredientQuantityEdit
            })
        }
        if(ingredientUnitEdit != "") {
            this.setState({
                ingredientUnit: ingredientUnitEdit
            })
        }

        const array = {
            ingredientName,
            ingredientQuantity,
            ingredientUnit,
            ingredientCut
        }

        ingredient[currentIndexIng] = array
        
        this.setState({
            ingredient
        })
        
    }

    closeOnPageEditIng = () => {
        const container = document.getElementById("subContainer")
        container.innerHTML = ""
    }

    handleEditIng = (index) => {
        const {ingredientName,
        ingredientQuantity,
        ingredientUnit,
        ingredientCut} = this.state
        const text = this.state.ingredient[index]
        this.setState({currentIndexIng: index})
        const mainContainer = document.getElementById("insertHere")
        
        // Create sub container with id
        const subContainer = document.createElement('div')
        subContainer.id = 'subContainer'
        mainContainer.appendChild(subContainer);
        
        console.log(ingredientName)
        const container = document.getElementById("subContainer")
        container.innerHTML = ""
        
        // Create multiple input elements
        var values = [ingredientName,
            ingredientQuantity,
            ingredientUnit,
            ingredientCut];

        var labels = ["Ingredient Name: ",
            "Ingredient Quantity: ",
            "Ingredient Unit: ",
            "Ingredient Cut: "];

        for(var i = 0; i < values.length; i += 1) {
            var lbl = document.createElement("label")
            lbl.innerHTML = labels[i]
            container.appendChild(lbl);
            
            var div = document.createElement("input")
            div.value = values[i]
            
            if(i == 0) {
                div.addEventListener('change', this.handleChangeIngredientNameEdit)
            }
            if(i == 1) {
                div.addEventListener('change', this.handleChangeIngredientQuantityEdit)
            }
            if(i == 2) {
                div.addEventListener('change', this.handleChangeIngredientUnitEdit)
            }
            if(i == 3) {
                div.addEventListener('change', this.handleChangeIngredientCutEdit)
            }
            container.appendChild(div);

            var br = document.createElement("br")
            container.appendChild(br);
        }

        // Set up the button
        const btn = document.createElement('input')
        btn.type = 'button'
        btn.value = 'Save'
        btn.addEventListener('click', this.saveOnPageEditIng);
        container.appendChild(btn);
        const closeBtn = document.createElement('input')
        closeBtn.type = 'button'
        closeBtn.value = 'Close'
        closeBtn.addEventListener('click', this.closeOnPageEditIng);
        container.appendChild(closeBtn);
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
                            <div>{ // display added ingredient here
                                ingredient.map((val,key) => {
                                    return <div key={key} className="addedIngredient" >
                                        <input id={key} value={val.ingredientQuantity +" "+ val.ingredientUnit+
                                        " " + val.ingredientName + " " + val.ingredientCut} disabled/>
                                        <input type="button" value="Edit" onClick={() => this.handleEditIng(key)}/>
                                        <input type="button" value="Delete" onClick={() => this.handleDelIng(key)}/>
                                    </div>
                                })
                            }</div>
                            <div id="insertHere">
                                
                            </div>
                            <input type="button" id="displayIng" value="+Add Ingredient" onClick={this.displayIngForm}/>
                            <div id="addIngForm">
                                
                            </div>
                            
                            {/* <form action="" id="addIng" style={{display: "none"}}>
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
                            </form> */}
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