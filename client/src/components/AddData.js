import React, {Component} from "react"
import { Link } from "react-router-dom"
import Axios from 'axios'

export class AddData extends Component {
    constructor(){
        super()
        this.state = {
            recipeName: "",
        }
    }

    // POST using Axios
    addNewRecipe = () => {
        //console.log(this.state.recipeName)
        Axios.post('http://localhost:8080/add-recipe', {recipeName: this.state.recipeName})
    }

    handleChange = e => {
        const {value} = e.target
        this.setState({ recipeName: value })
    }

    render() {
        const {recipeName} = this.state
        return (
            <div className="addData">
                <div className="container">
                    <form onSubmit={this.addNewRecipe}>
                        <input id="recipeName" name="recipeName" placeholder="Type Recipe Name Here" value={recipeName} onChange={this.handleChange}/>
                        {/*<div className="addForm">
                            <h3>Ingredient/s:</h3>
                            <button onClick={
                                () =>
                                document.getElementById("addIng").style.display = "block"
                            }>+ Add Ingredient</button>
                            <form action="" id="addIng" style={{display: "none"}}>
                                <input type="text" placeholder="Enter Ingredient..."/>
                                <input type="submit"/>
                                <input type="button" onClick={
                                () =>
                                document.getElementById("addIng").style.display = "none"
                                } value="close"/>
                            </form>
                        </div>
                        <div className="addForm">
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