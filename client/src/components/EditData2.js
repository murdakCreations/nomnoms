import React, { Component } from "react";
import { withRouter } from '../common/with-router';
import { Link } from "react-router-dom"
import Axios from 'axios'

class EditData extends Component {
  constructor(props) {
    super(props);
    this.onChangeRecipeName = this.onChangeRecipeName.bind(this);
    this.getRecipeID = this.getRecipeID.bind(this);
    this.updateRecipe = this.updateRecipe.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
    this.handleChangeIngredientQuantity = this.handleChangeIngredientQuantity.bind(this) 
    this.handleChangeIngredientQuantity =     this.handleChangeIngredientQuantity.bind(this)
    this.handleChangeIngredientUnit =     this.handleChangeIngredientUnit.bind(this)
    this.handleChangeIngredientName =     this.handleChangeIngredientName.bind(this)
    this.handleChangeIngredientCut =     this.handleChangeIngredientCut.bind(this)
    this.displayIngForm =     this.displayIngForm.bind(this)
    this.submitIngredient =     this.submitIngredient.bind(this)
    this.hideIngForm =     this.hideIngForm.bind(this)
    this.handleEditIng =     this.handleEditIng.bind(this)
    this.handleChangeIngredientNameEdit =     this.handleChangeIngredientNameEdit.bind(this)
    this.handleChangeIngredientUnitEdit =     this.handleChangeIngredientUnitEdit.bind(this)
    this.handleChangeIngredientQuantityEdit =     this.handleChangeIngredientQuantityEdit.bind(this)
    this.handleChangeIngredientCutEdit =     this.handleChangeIngredientCutEdit.bind(this)
    this.saveOnPageEditIng =     this.saveOnPageEditIng.bind(this)
    this.closeOnPageEditIng =     this.closeOnPageEditIng.bind(this)
    this.displayProcForm = this.displayProcForm.bind(this)
    this.handleChangeProcedureContent =     this.handleChangeProcedureContent.bind(this)
    this.submitProcedure =     this.submitProcedure.bind(this)
    this.hideProcForm =     this.hideProcForm.bind(this)
    this.handleChangeProcedureContentEdit =     this.handleChangeProcedureContentEdit.bind(this)
    this.handleEditProc =     this.handleEditProc.bind(this)
    this.handleDelProc =     this.handleDelProc.bind(this)
    this.saveOnPageEditProc =     this.saveOnPageEditProc.bind(this)
    this.closeOnPageEditProc =     this.closeOnPageEditProc.bind(this)

    this.state = {
      recipeName: "",
      ingredient: [],
      procedure: [],
      ingredientName: "",
      ingredientQuantity: 0,
      ingredientUnit: "",
      ingredientCut: "",
      currentIndexIng: 0,
      paramID: "",
      procedureNum: 1,
      procedureContent: ""
    };
  }

  componentDidMount() {
    this.getRecipeID(this.props.router.params.id);
  }

  onChangeRecipeName(e) {
    const value = e.target.value;
    
    this.setState({
      recipeName: value.toLowerCase()
    }, console.log(this.state.recipeName))
  }

  getRecipeID(id) {
    Axios.get(`https://nomnoms-backend.vercel.app/get-recipe/${id}`)
      .then(response => {
        response.data.data.getRecipe.map((val,key)=>{
          this.setState({
            recipeName: val.recipeName,
            ingredient: val.ingredient,
            procedure: val.procedure
          });
        })
      })
      .catch(e => {
        console.log(e);
      });

    this.setState({
      paramID: id
    })
  }

  updateRecipe() {
    Axios.put(`https://nomnoms-backend.vercel.app/update-recipe/${this.state.paramID}`, {
        recipeName: this.state.recipeName,
        ingredient: this.state.ingredient,
        procedure: this.state.procedure
    })
      .then(() => {
        this.props.router.navigate('/displayAll')
      }).catch(e => {
        console.log(e)
      })   
  }

  deleteRecipe() { 
    Axios.delete(`https://nomnoms-backend.vercel.app/delete-recipe/${this.state.paramID}`)
      .then(() => {
        this.props.router.navigate('/displayAll')
      }).catch(e => {
        console.log(e)
      })   
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

  hideIngForm = () => {
    const container = document.getElementById("addIngSubContainer")
    container.innerHTML = ""

    // unhide add ing button
    const addIngBtn = document.getElementById("displayIng")
    addIngBtn.style.visibility = "visible"
  }

  handleEditIng = (index) => {
    console.log(index)
    const {ingredient} = this.state
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
      console.log(value)
  }

  saveOnPageEditIng = () => {
    const {ingredientUnit, ingredientQuantity, ingredientName, ingredientCut, ingredient, currentIndexIng} = this.state

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

  hideProcForm = () => {
    const container = document.getElementById("addProcSubContainer")
    container.innerHTML = ""

    // unhide add proc button
    const addProcBtn = document.getElementById("displayProc")
    addProcBtn.style.visibility = "visible"
  }

  
handleChangeProcedureContentEdit = e => {
    const {value} = e.target
    this.setState({ procedureContent: value })
}

handleEditProc = (index) => {
    const {procedure} = this.state
    this.setState({ procedureNum: index })
    //this.setState({currentIndexProc: index})
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
          procedure,
          currentIndexProc} = this.state
      
      console.log(procedureNum)
      procedure[procedureNum] = procedureContent
      

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
    const { recipeName, ingredient, procedure } = this.state;

    return (
      <div>
        {recipeName ? (
          <div className="edit-form">
            <h4>RECIPE</h4>
            <form>
              <div className="form-group">
                <label htmlFor="recipeName">Recipe Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="recipeName"
                    defaultValue={recipeName}
                    onChange={this.onChangeRecipeName}
                  />
              </div>
              {
                ingredient.map((val, key) => {
                  return <div className="form-group">
                  <input id={key} value={val.ingredientQuantity +" "+ val.ingredientUnit+
                  " " + val.ingredientName + " " + val.ingredientCut} disabled/>
                  <input type="button" value="Edit" onClick={() => this.handleEditIng(key)}/>
                  <input type="button" value="Delete" onClick={() => this.handleDelIng(key)}/>
                </div>
                })
              }
              <div id="insertHere">
                                    
              </div>
              <input type="button" id="displayIng" value="+Add Ingredient" onClick={this.displayIngForm}/>
              <div id="addIngForm">
                  
              </div>
              {
                procedure.map((val, key) => {
                  return <div className="form-group">
                  <input id={key} value={val} disabled/>
                  <input type="button" value="Edit" onClick={() => this.handleEditProc(key)}/>
                  <input type="button" value="Delete" onClick={() => this.handleDelProc(key)}/>
                </div>
                })
              }
              <div id="insertEditProcFormHere">
                                    
              </div>
              <input type="button" id="displayProc" value="+Add Procedure" onClick={this.displayProcForm}/>
              <div id="addProcForm">
                  
              </div>
            </form>

            <button
              className="badge badge-danger mr-2"
              id="deleteBtn"
              onClick={this.deleteRecipe}
            >
              Delete
            </button>

            <button
              type="submit"
              id="updateBtn"
              className="badge badge-success"
              onClick={this.updateRecipe}
            >
              Update
            </button>
            <Link to="/displayAll" className="close">Back</Link>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Student...</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(EditData);