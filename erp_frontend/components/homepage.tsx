import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Button } from '@material-ui/core';

const HomePage = () => {
    return (
        <>
            <div
                style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                }}
            >
                <Button variant="outlined" style={{ margin: '5px' }} component="a" href="/adminview">Click this button to be taken to the Administator Page / Operations Manager Page</Button>
                <Button variant="outlined" style={{ margin: '5px' }} component="a" href="/employee">Click this button to be taken to the Employee Dashboard</Button>
                <Button variant="outlined" style={{ margin: '5px' }} component="a" href="/client">Click this button to be taken to the Client Dashboard</Button><br></br>
                <Button variant="outlined" style={{ margin: '5px' }} component="a" href="/inventory">Click this button to be taken to Inventory Management</Button>
                <Button variant="outlined" style={{ margin: '5px' }} component="a" href="/sales">Click this button to be taken to Sales</Button>
            </div>
        </>
    )
}

export default HomePage;
