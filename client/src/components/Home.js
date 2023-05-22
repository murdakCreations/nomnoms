import React, {Component} from "react"
import './Home.css'
import { Link } from "react-router-dom"

export class Home extends Component {
    render() {
        return (
            <div className="home">
                <div className="container">
                    <h3>Welcome to</h3>
                    <h1>Nom Noms</h1>
                    <h5>where you don't have to worry about<br/> what to make and eat</h5>
                    <div id="getStarted"><div><Link to="/landingPage">Get Started</Link></div></div>
                </div>
            </div>
        )
    }
}