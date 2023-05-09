import React, { useState, useEffect, Component } from "react"
import Axios from 'axios'
import './App.css'

/*App version to show or hide component */
class App extends Component {
  constructor(){
    super()
    this.state = {
      name: '',
      searched: [],
      searchClick: false,
      getRecipes: false
    }
  }

  displayRecipe = () => {
    this.setState({
      getRecipes: true
    })
  }
  
  // GET using Axios search ingredient
  searchRecipe = () => {
    Axios.get(`https://nomnoms-backend.vercel.app/search-recipe/${this.state.name}`).then(({ data }) => {
      this.setState({
        searched: data.data.recipes
      })
    })
    if(!this.state.searchClick){
      this.setState({
        searchClick: true
      })
    }
    else {
      this.setState({
        searchClick: false
      })
    }
  }

  noResults = () => {
    if(this.state.searchClick && this.state.searched.length === 0) {
      return <div>No results found</div>
    }
  }
  
  render(){
    return(
      <div className="container">
        <div className="searchBar">
          <h3>What can I make with...</h3>
          <input type="text" placeholder="Enter Food" onChange={(e) => {
            this.setState({
              name: e.target.value
            })
          }} /><br/><br/>
          <button onClick={this.searchRecipe}>Search</button>
        </div>
        
        <div className="searched" style={this.state.searchClick ? {display:"block"}: {display:"none"}}>
          <h4>Here’s what you can make with {this.state.name}:</h4>
          <div className="noRes">{this.noResults()}</div>
          { /*display searched ingredient */
            this.state.searched.map((val,key) => {
              return <div key={key} className="recipeName" >
                  <button onClick={this.displayRecipe}><h3>{val.recipeName}</h3></button>
              </div>
            })
          }
        </div>
        <div className="ingProc" style={this.state.getRecipes ? {display:"block"}: {display:"none"}}>
          <div></div>
          <div className="ingProcContent">
            <h4><b>Ingredients:</b></h4>
            { /*Display Ingredients */
              this.state.searched.map((val,key) => {
                return <div key={key} className="recipe" >
                  <ul> 
                    {
                      val.ingredient.map((ing,key) => {
                        return <li key={key}>{ing.ingredientName}</li>
                      })
                    }
                  </ul>
                </div>
              })
            }
          </div>
          <div className="ingProcContent">
            <b>Procedure:</b>
            { /*Display Procedure */
              this.state.searched.map((val,key) => {
                return <div key={key} className="recipe" >
                  <ol> 
                    {
                      val.procedure.map((proc,key) => {
                        return <li key={key}>{proc}</li> 
                      })
                    }
                  </ol>  
                </div>
              })
            }
          </div>
        </div>
      </div>
    )
  }
}

export default App