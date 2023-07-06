import React, {Component} from 'react'
import './LandingPage.css'
import { Link } from "react-router-dom"
import Axios from 'axios'

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
        Axios.get(`http://localhost:8080/search-recipe/${this.state.name}`).then(({ data }) => {
          //console.log(data.data.ingSearch===undefined)
          if(data.data.ingSearch===undefined){
            this.setState({
              searched: data.data.recipeSearch
            })
          } else {
            this.setState({
              searched: data.data.ingSearch
            })
          }
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
                  <input type="text" id='food' placeholder="Enter Food" onChange={(e) => {
                      this.setState({
                        name: e.target.value.toLowerCase(),
                        searchClick: false
                      })
                  }}/><br/>
                  <button onClick={this.searchRecipe}>Search</button>
                  <div id='dispBtn'><Link to="/displayAll">Display All Recipe</Link></div>
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