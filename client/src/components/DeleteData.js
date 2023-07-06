import React, {Component} from "react"
import { useParams, Link } from "react-router-dom"
import Axios from 'axios'
import './EditData.css'
import { withRouter } from '../common/with-router'

class EditData extends Component {
    constructor(props){
        super(props)
        this.state = {
            
        }
    }

    render() {
        console.log(this.props.router.params.id)
        return(
            <div>
                <nav>
                    <div id='back'><Link to="/displayAll">Back</Link></div>
                </nav>
            </div>
        )
    }
}

export default withRouter(EditData)