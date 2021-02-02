import React, {Component} from 'react'
import {Link} from "react-router-dom"
import ReactDOM from 'react-dom'
import { Button } from '@material-ui/core'
import Navbar from './navbar'

const HomePage = () => {
    return (
        <>
            <div>
                <Link to={'/adminview'}>
                <Button>Click this button to be taken to the AdminPage</Button>
                </Link>
            </div>
        </>
    )
}

export default HomePage;
