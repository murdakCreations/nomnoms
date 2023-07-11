import React, { Component } from "react";
import { withRouter } from '../common/with-router';
import { Link } from "react-router-dom"
import Axios from 'axios'

class EditData extends Component {
  constructor(props) {
    super(props);
    this.onChangeRecipeName = this.onChangeRecipeName.bind(this);
    this.onChangeStudentName = this.onChangeStudentName.bind(this);
    this.onChangeWeight = this.onChangeWeight.bind(this);
    this.onChangeHeight = this.onChangeHeight.bind(this);
    this.getRecipeID = this.getRecipeID.bind(this);
    this.updateStudent = this.updateStudent.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
    this.computeBMIVal = this.computeBMIVal.bind(this)

    this.state = {
      recipeName: "",
      ingredient: [],
      procedure: [],
      ingredientName: "",
      ingredientQuantity: 0,
      ingredientUnit: "",
      ingredientCut: "",
      currentIndexIng: 0,
      recipe: [],
      paramID: ""
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
    // this.setState(function(prevState) {
    //   return {
    //     currentStudent: {
    //       ...prevState.currentStudent,
    //       studentID: id
    //     }
    //   };
    // });
  }

  onChangeStudentName(e) {
    const name = e.target.value;
    
    this.setState(prevState => ({
      currentStudent: {
        ...prevState.currentStudent,
        studentName: name
      }
    }));
  }

  onChangeWeight(e) {
    const weight = e.target.value;
    
    this.setState(prevState => ({
      currentStudent: {
        ...prevState.currentStudent,
        weight: weight
      }
    }),
    () =>this.computeBMIVal()
    );
  }

  onChangeHeight(e) {
    const height = e.target.value;
    
    this.setState(prevState => ({
      currentStudent: {
        ...prevState.currentStudent,
        height: height
      }
    }),
    () =>this.computeBMIVal()
    );
  }

  getRecipeID(id) {
    Axios.get(`https://nomnoms-backend.vercel.app/get-recipe/${id}`)
      .then(response => {
        response.data.data.getRecipe.map((val,key)=>{
          this.setState({
            recipeName: val.recipeName
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

  updateStudent() {
    Axios.put(`https://nomnoms-backend.vercel.app/update-recipe/${this.state.paramID}`, {
        recipeName: this.state.recipeName,
        // ingredient: this.state.ingredient,
        // procedure: this.state.procedure
    })
      .then(() => {
        this.props.router.navigate('/displayAll')
      }).catch(e => {
        console.log(e)
      })   
    // StudentBMIDataService.update(
    //   this.state.currentStudent.studentID,
    //   this.state.currentStudent
    // )
    //   .then(response => {
    //     console.log(response.data);
    //     this.setState({
    //       message: "The student data was updated successfully!"
    //     });
    //   })
    //   .catch(e => {
    //     console.log(e);
    //   });
  }

  deleteRecipe() { 
    Axios.delete(`https://nomnoms-backend.vercel.app/delete-recipe/${this.state.paramID}`)
      .then(() => {
        this.props.router.navigate('/displayAll')
      }).catch(e => {
        console.log(e)
      })   
  }

    computeBMIVal() {
      if(this.state.currentStudent.weight>0.0 && this.state.currentStudent.height>0.0){
          let w = this.state.currentStudent.weight
          let h = this.state.currentStudent.height
          let comp = Number(w/h**2)
          if(comp < 15){
            this.setState(prevState => ({
              currentStudent: {
                ...prevState.currentStudent,
                BMIVal: "Very severely underweight"
              }
            }));
          }
          if(comp >= 15 && comp <=16){
            this.setState(prevState => ({
              currentStudent: {
                ...prevState.currentStudent,
                BMIVal: "Severely underweight"
              }
            }));
          }
          if(comp > 16 && comp <= 18.5){
            this.setState(prevState => ({
              currentStudent: {
                ...prevState.currentStudent,
                BMIVal: "Underweight"
              }
            }));
          }
          if(comp > 18.5 && comp <= 25){
            this.setState(prevState => ({
              currentStudent: {
                ...prevState.currentStudent,
                BMIVal: "Normal"
              }
            }));
          }
          if(comp > 25 && comp <= 30){
            this.setState(prevState => ({
              currentStudent: {
                ...prevState.currentStudent,
                BMIVal: "Overweight"
              }
            }));
          }
          if(comp > 30 && comp <= 35){
            this.setState(prevState => ({
              currentStudent: {
                ...prevState.currentStudent,
                BMIVal: "Moderately Overweight"
              }
            }));
          }
          if(comp > 35 && comp <= 40){
            this.setState(prevState => ({
              currentStudent: {
                ...prevState.currentStudent,
                BMIVal: "Severely Overweight"
              }
            }));
          }
          if(comp > 40){
            this.setState(prevState => ({
              currentStudent: {
                ...prevState.currentStudent,
                BMIVal: "Very severely obese"
              }
            }));
          }
      }
    }

  render() {
    const { recipeName } = this.state;

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
              {/* <div className="form-group">
                <label htmlFor="studentName">Student Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="studentName"
                  value={currentStudent.studentName}
                  onChange={this.onChangeStudentName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="weight">Weight</label>
                <input
                  type="text"
                  className="form-control"
                  id="weight"
                  value={currentStudent.weight}
                  onChange={this.onChangeWeight}
                />
              </div>
              <div className="form-group">
                <label htmlFor="height">Height</label>
                <input
                  type="text"
                  className="form-control"
                  id="height"
                  value={currentStudent.height}
                  onChange={this.onChangeHeight}
                />
              </div>

              <div className="form-group">
                <label htmlFor="BMI">BMI</label>
                <input
                  type="text"
                  className="form-control"
                  id="BMI"
                  value={currentStudent.BMIVal}
                />
              </div> */}
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
              onClick={this.updateStudent}
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