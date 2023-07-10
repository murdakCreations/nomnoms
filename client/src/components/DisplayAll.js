import React, { useState} from 'react'
import { useEffect } from 'react'
import './DisplayAll.css'
import { Link } from "react-router-dom"
import Axios from 'axios'

function DisplayAll(){
      const [allData, setAllData] = useState([])
      
      // GET using Axios search ingredient
      useEffect(() => {
        Axios.get(`https://nomnoms-backend.vercel.app/get-recipe`).then(({ data }) => {
          setAllData(data.data.recipes)
        })
      },[])
    
      const deleteRecipe = (id) => {
        Axios.delete(`https://nomnoms-backend.vercel.app/delete-recipe/${id}`).then(() => {
          window.location.reload('/displayAll')
        }).catch(e => {
          console.log(e)
        })
      }
    
 
    return (
        <div className='displayAllPage'>
          <nav>
            <div id='back'><Link to="/landingPage">Back</Link></div>
            <div id='addBtn'><Link to="/addData">Add Recipe</Link></div>
            
          </nav>
            <div className="container">
                <div className='searchResContainer'>
                    <div className="searchRes">
                        <h2>Here are all the Recipes:</h2>
                        { 
                          allData.map((val,key) => {
                            return <div key={key} className="searchRes resBtn" >
                                <Link to="/recipe" state={{recipe:val}}>
                                    <img src="img/chicken-inasal.png" alt="chicken-inasal"/>
                                    <div className="resLbl">{val.recipeName}</div>
                                </Link>
                                <div>
                                  <Link to={"/editData/" + val._id}>Edit</Link>
                                  <button onClick={() => deleteRecipe(val._id)}>Delete</button>
                                </div>
                            </div>
                          })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
    
}

export default DisplayAll