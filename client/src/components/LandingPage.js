import React, {Component} from 'react'
import './LandingPage.css'
import { Link } from "react-router-dom"
import Axios from 'axios'
import { Recipes } from './Recipes'

class LandingPage extends Component{
    constructor(){
        super()
        this.state = {
          name: '',
          searched: [],
          searchClick: false,
          getRecipes: []
        }
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
    return (
        <div className='landingPage'>
            <div className="container">
                <div className="searchBar">
                <h3>What can I make with...</h3>
                <input type="text" placeholder="Enter Food" onChange={(e) => {
                    this.setState({
                    name: e.target.value
                    })
                }}/><br/>
                <button onClick={this.searchRecipe}>Search</button>
                </div>
                <div className='searchResContainer'>
                    <div className="searchRes" style={this.state.searchClick ? {display:"inline-block"}: {display:"none"}}>
                        <h2>Here's what you can make with {this.state.name}:</h2>
                        <div className="noRes">{this.noResults()}</div>
                        { /*display searched ingredient */
                            this.state.searched.map((val,key) => {
                            return <div key={key} className="searchRes resBtn" >
                                <Link to="/recipe" state={{recipe:val}}>
                                    <img src="img/chicken-inasal.png" alt="chicken-inasal"/>
                                    <div className="resLbl">{val.recipeName}</div>
                                </Link>
                            </div>
          
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
  }
    
}

export default LandingPage