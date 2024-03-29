import React, {Component} from "react"
import { Link } from "react-router-dom"
import Axios from 'axios'
import './AddData.css'

export default class AddData extends Component {
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
            ingredientCutEdit: "",
            procedureNumEdit: 0,
            procedureContentEdit: "",
            currentIndexProc: 0,
            randomShit: ""
        }
    }

    // POST using Axios
    addNewRecipe = () => {
        Axios.post('https://nomnoms-backend.vercel.app/add-recipe', {
            recipeName: this.state.recipeName,
            ingredient: this.state.ingredient,
            procedure: this.state.procedure
        }).then(() => {
            window.location.reload('/displayAll')
          }).catch(e => {
            console.log(e)
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
        this.setState({ ingredientName: value.toLowerCase() })
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
                div.type = 'number'
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
        console.log(procedure)
    }

    displayProcForm = () => {
        const {procedureNum,
            procedureContent} = this.state
        const mainContainer = document.getElementById("addProcForm")
        
        // Create sub container with id
        const subContainer = document.createElement('div')
        subContainer.id = 'addProcSubContainer'
        mainContainer.appendChild(subContainer);
        
        const container = document.getElementById("addProcSubContainer")
        container.innerHTML = ""
        
        // Create input elements for adding
        var values = [procedureNum,
            procedureContent];

        var labels = ["Procedure Number: ",
            "Procedure: "];

        for(var i = 0; i < values.length; i += 1) {
            var lbl = document.createElement("label")
            lbl.innerHTML = labels[i]
            container.appendChild(lbl);
            
            var div = document.createElement("input")
            div.value = values[i]
            if(i == 0) {
                div.addEventListener('change', this.handleChangeProcedureNum)
                div.type = 'number'
            }
            if(i == 1) {
                div.addEventListener('change', this.handleChangeProcedureContent)
            }
            container.appendChild(div);

            var br = document.createElement("br")
            container.appendChild(br);
        }
        

        // Set up the button
        const btn = document.createElement('input')
        btn.type = 'button'
        btn.value = 'Add Procedure'
        btn.addEventListener('click', this.submitProcedure);
        container.appendChild(btn);
        const closeBtn = document.createElement('input')
        closeBtn.type = 'button'
        closeBtn.value = 'Close'
        closeBtn.addEventListener('click', this.hideProcForm);
        container.appendChild(closeBtn);
    
            
        // hide add proc button
        const addIngBtn = document.getElementById("displayProc")
        addIngBtn.style.visibility = "hidden"
    }

    hideProcForm = () => {
        const container = document.getElementById("addProcSubContainer")
        container.innerHTML = ""

        // unhide add proc button
        const addProcBtn = document.getElementById("displayProc")
        addProcBtn.style.visibility = "visible"
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
        this.setState({ ingredientName: value.toLowerCase() })
    }

    handleChangeIngredientUnitEdit = e => {
        const {value} = e.target
        this.setState({ ingredientUnit: value })
    }

    handleChangeIngredientQuantityEdit = e => {
        const {value} = e.target
        this.setState({ ingredientQuantity: value })
    }

    handleChangeIngredientCutEdit = e => {
        const {value} = e.target
        this.setState({ ingredientCut: value })
    }
    
    saveOnPageEditIng = () => {
        const {ingredientUnit, ingredientQuantity, ingredientName, ingredientCut,
            ingredientNameEdit,ingredientQuantityEdit,
        ingredientUnitEdit,ingredientCutEdit, ingredient, currentIndexIng} = this.state
        

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

        // unhide add ing button
        const addIngBtn = document.getElementById("displayIng")
        addIngBtn.style.visibility = "visible"
    }

    handleEditIng = (index) => {
        console.log(index)
        const {ingredientName,
        ingredientQuantity,
        ingredientUnit,
        ingredientCut, ingredient} = this.state
        this.setState({currentIndexIng: index})
        const mainContainer = document.getElementById("insertHere")
        
        // Create sub container with id
        const subContainer = document.createElement('div')
        subContainer.id = 'subContainer'
        mainContainer.appendChild(subContainer);
        
        const container = document.getElementById("subContainer")
        container.innerHTML = ""
        const addIngForm = document.getElementById("addIngSubContainer")
        if(addIngForm){
            addIngForm.innerHTML = ""
        }
          
        const currentIng = ingredient[index]
        
        // Create multiple input elements
        var values = [currentIng.ingredientName,
            currentIng.ingredientQuantity,
            currentIng.ingredientUnit,
            currentIng.ingredientCut];

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
                div.type = 'number'
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

    handleChangeProcedureContentEdit = e => {
        const {value} = e.target
        this.setState({ procedureContent: value })
    }

    handleEditProc = (index) => {
        const {procedure} = this.state
        this.setState({ procedureNum: index })
        const mainContainer = document.getElementById("insertEditProcFormHere")
        
        // Create sub container with id
        const subContainer = document.createElement('div')
        subContainer.id = 'subContainerProc'
        mainContainer.appendChild(subContainer);
        
        const container = document.getElementById("subContainerProc")
        container.innerHTML = ""
        const addProcForm = document.getElementById("addProcForm")
        addProcForm.innerHTML = ""
        
        const currentProc = procedure[index]
        // Create input elements for editing
        var values = [index,
            currentProc];

        var labels = ["Procedure Number: ",
            "Procedure: "];

        for(var i = 0; i < values.length; i += 1) {
            var lbl = document.createElement("label")
            lbl.innerHTML = labels[i]
            container.appendChild(lbl);
            
            var div = document.createElement("input")
            div.value = values[i]
            if(i == 1) {
                div.addEventListener('change', this.handleChangeProcedureContentEdit)
            }
            container.appendChild(div);

            var br = document.createElement("br")
            container.appendChild(br);
        }
        

        // Set up the button
        const btn = document.createElement('input')
        btn.type = 'button'
        btn.value = 'Save'
        btn.addEventListener('click', this.saveOnPageEditProc);
        container.appendChild(btn);
        const closeBtn = document.createElement('input')
        closeBtn.type = 'button'
        closeBtn.value = 'Close'
        closeBtn.addEventListener('click', this.closeOnPageEditProc);
        container.appendChild(closeBtn);
    }

    handleDelProc = (index) => {
        const {procedure} = this.state
        procedure.splice(index, 1)
        this.setState({procedure})
    }

    saveOnPageEditProc = () => {
        const {procedureNum,
            procedureContent,
            procedureNumEdit,
            procedureContentEdit,
            procedure,
            currentIndexProc} = this.state
        

        // check if edit variable is empty or the value hasn't change
        
        if(procedureNumEdit != "") {
            this.setState({
                procedureNum: procedureNumEdit
            })
        }
        if(procedureContentEdit != "") {
            this.setState({
                procedureContent: procedureContentEdit
            })
        }


        if(currentIndexProc != procedureNum) {
            procedure[currentIndexProc] = ""
            procedure[procedureNum] = procedureContent
        }
        if(currentIndexProc == procedureNum) {
            procedure[procedureNum] = procedureContent
        }
        

        this.setState({
            procedure
        })
        
    }

    closeOnPageEditProc = () => {
        const container = document.getElementById("subContainerProc")
        container.innerHTML = ""

        // unhide add ing button
        const addIngBtn = document.getElementById("displayProc")
        addIngBtn.style.visibility = "visible"
    }

    render() {
        const { ingredient, recipeName, ingredientUnit, ingredientQuantity, ingredientName, ingredientCut, procedureNum, procedureContent, procedure} = this.state
        return (
            <div className="addData">
                <div className="container">
                    <form onSubmit={this.addNewRecipe}>
                        {/* recipe name input */}
                        <input maxLength="50" id="recipeName" name="recipeName" placeholder="Type Recipe Name Here" value={recipeName} onChange={this.handleChangeRecipeName}/>
                        <div className="subcontainer">
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
                                
                            </div>
                            <div className="addForm">
                                <h3>Procedure/s:</h3>
                                <ol>{ // display added procedure here
                                    procedure.map((val,key) => {
                                        return <li key={key} className="addedProcedure" >
                                            <input id={key} value={val} disabled/>
                                            <input type="button" value="Edit" onClick={() => this.handleEditProc(key)}/>
                                            <input type="button" value="Delete" onClick={() => this.handleDelProc(key)}/>
                                        </li>
                                    })
                                }</ol>
                                <div id="insertEditProcFormHere">
                                    
                                </div>
                                <input type="button" id="displayProc" value="+Add Procedure" onClick={this.displayProcForm}/>
                                <div id="addProcForm">
                                    
                                </div>
                            </div>
                        </div>
                        <div className="subcontainer">
                            <div className="saveClose">
                                <input className="save" type="submit"/>
                                <Link to="/displayAll" className="close">Back</Link>
                            </div>  
                        </div>
                        
                    </form>
                </div>
            </div>
        )
    }
}