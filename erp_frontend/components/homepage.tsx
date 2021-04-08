import React, { Component } from 'react'
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
                
                <Button variant="outlined" style={{ margin: '5px' }} component="a" href="/employee">Employee Dashboard</Button>
                <Button variant="outlined" style={{ margin: '5px' }} component="a" href="/client">Client Dashboard</Button><br></br>
            </div>
        </>
    )
}

export default HomePage;
