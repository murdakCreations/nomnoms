import React, {Component} from "react"

export class AddData extends Component {
    render() {
        return (
            <div className="addData">
                <div className="container">
                    <div className="addForm">
                        <h3>Ingredient/s:</h3>
                        <button onClick={
                            () =>
                            document.getElementById("addIng").style.display = "block"
                        }>+ Add Ingredient</button>
                        <form action="" id="addIng" style={{display: "none"}}>
                            <input type="text" placeholder="Enter Ingredient..."/>
                            <input type="submit" value="Submit"/>
                            <input type="submit" value="Close"/>
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
                            <input type="submit" value="Submit"/>
                            <button onClick={
                            () =>
                            document.getElementById("addProc").style.display = "none"
                            }>Close</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}