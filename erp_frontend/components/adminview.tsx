import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import { Button } from 'evergreen-ui'
import Navbar from './navbar'
import './App.css'

class AdminPage extends Component {
    render(){
        return (
            <div>
                <Navbar />
                <p>Something here</p>
                <div className="containerAdmin">
                </div>
            </div>
        );
    }
}

export default AdminPage;
