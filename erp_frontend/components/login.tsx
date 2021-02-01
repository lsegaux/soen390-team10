import React, { useState, Component } from "react";
import { Button, FormField, TextInput, Pane } from 'evergreen-ui'
import axios, { AxiosRequestConfig, AxiosPromise, AxiosResponse } from 'axios';

export default function Login() {
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    const loginData = {
      email: username,
      password
    };
    
        axios({
        method: 'post',
        url: 'http://localhost:4000/api/v1/sign_in',
        headers: { "Content-Type": "application/json" }, 
        data: loginData
        }).then(res => { 
          if (res.status === 200) {
            console.log(res)
          } 
        }).catch(err => { 
          console.error(err);
        });
  }

  return (
    <div style={{
      position: 'absolute', left: '50%', top: '50%',
      transform: 'translate(-50%, -50%)'
  }}>
        <Pane
        elevation={4}
        paddingTop={40}
        width={400}
        height={300}
        alignItems="center"
        background ="blueTint">

          <FormField label = 'Login' textAlign='center'>
              <div style={{paddingTop: '20px'}}>
                <TextInput
                  name="Username"
                  placeholder="Username"
                  value={username}
                  onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setUsername(e.target.value)}
                />
              </div>
              <div style={{padding: '20px', paddingBottom: '40px'}}>
                
                <TextInput
                required
                name="Password"
                placeholder="Password"
                value={password}
                type="password"
                onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setPassword(e.target.value)}
              />
            </div>
            <Button disabled={!validateForm()} type='submit'  onClick={handleSubmit} >Login</Button>
          </FormField>
      </Pane>
    </div>
  );
}