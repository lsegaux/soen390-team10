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
  .horizontalSpace {
    text-align: center;
    allignSelf: 'center';
    background-color: rgba(246, 215, 143, 0.5);
    height 100%;
    fontFamily: serif;
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
                <div><VerticalNavbar /></div>
            </div>
        </div>
    )
}

export default AdminPage;