import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import { Button } from 'evergreen-ui'
import AdminNavbar from './adminnavbar'
import VerticalNavbar from './adminverticalnavbar'

import {AnimateSharedLayout} from "framer-motion"
import { CssBaseline, makeStyles } from '@material-ui/core'

const css = `
body, html {
    background-image: url("https://wallpapercave.com/wp/wp2954634.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    color: black;
    height: 100%;
    width: 100%;
    margin: 0;
  }

.left-page menu {
    
}
`


function AdminPage() {
    return (
        <div>
            <style>
                {css}
            </style>
            <div className="admin-page">
                <VerticalNavbar />
            </div>
        </div>
    )
}

export default AdminPage;