import React, { useState } from "react";
import axios from "axios";
import { Button, FormField, TextInput, Pane, Heading } from 'evergreen-ui'
import {loginPost} from "../utils/datafetcher"
import { Auth } from "../Auth";


export default function Login(this: any) {
  
  const [email, setEmail] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [password, setPassword] = useState("");
  
  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    loginPost(email, password)
    .then(res => { 
      if (res.status === 200) {
        console.log(res);
        localStorage.setItem("jwt", res.data.jwt);
        axios({
          method: 'get',
          url: `http://localhost:4000/api/v1/my_user1`,
          headers: { "Content-Type": "application/json", "Authorization": "Bearer " + localStorage.getItem("jwt") },
        }).then(resRole => {
          if (resRole.status === 200) {
            window.location.href = `/${resRole.data.role}`
          }
        }).catch(err => {
          console.error(err);
        });
        //window.location.href = "/"
        return
      }
      setLoginError(true);
    })
    .catch(err => { 
        setLoginError(true);
        console.error(err);
    });
  }

  if(Auth.isAuthenticated()) {
    window.location.href = "/"
  }

  return (
    <Pane 
    display="flex"
    alignItems="center"
    justifyContent="center"
    paddingTop={300}
    >
        <Pane
        elevation={4}
        padding={20}
        paddingTop={50}
        paddingBottom={50}
        alignItems="center"
        background ="blueTint">

          <FormField textAlign='center'>
            <Heading marginTop={15} marginBottom={15} size={700}>Login</Heading>
              <div style={{paddingTop: '20px'}}>
                <TextInput
                  name="Email"
                  placeholder="Email"
                  value={email}
                  onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setEmail(e.target.value)}
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
                {loginError &&  <FormField label='' validationMessage='Username or password is incorrect' />}
            </div>
            <Button id="loginBtn" disabled={!validateForm()} type='submit' appearance="primary" onClick={handleSubmit}>Login</Button>
            <Button type='submit' marginLeft={15} onClick={ () => {window.location.href = "/signup"}}>Sign Up</Button>
            <Pane marginBottom={15}></Pane>
          </FormField>
      </Pane>
    </Pane>
  );
}