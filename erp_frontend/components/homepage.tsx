import React, {Component} from 'react'
import {Link} from "react-router-dom"
import ReactDOM from 'react-dom'
import { Button } from '@material-ui/core'

const HomePage = () => {
    return (
        <>
            <div>
                <Link to={'/adminview'}>
                <Button>Click this button to be taken to the Administator Page / Operations Manager Page</Button>
                </Link>
                <Link to={'/dashboard'}>
                <Button>Click this button to be taken to the Dashboard</Button>
                </Link>
                <Link to={'/client'}>
                <Button>Click this button to be taken to the Client Dashboard</Button>
                </Link>
            </div>
        </>
    )
}

export default HomePage;
