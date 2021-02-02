import React, { useState } from "react";
import { Button, FormField, TextInput, Pane } from 'evergreen-ui'
import axios from 'axios';
import { Redirect } from "react-router-dom";

export default function Login(this: any) {
  
  const url = 'http://localhost:4000';

  const [email, setEmail] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [homeRedirect, setHomeRedirect] = useState(false);
  const [signUpRedirect, setSignUpRedirect] = useState(false);
  const [password, setPassword] = useState("");
  
  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const loginData = {
      email: email,
      password: password
    };
        axios({
        method: 'post',
        url: `${url}/api/v1/sign_in`,
        headers: { "Content-Type": "application/json" }, 
        data: loginData
        }).then(res => { 
          if (res.status === 200) {
            console.log(res);
            localStorage.setItem("jwt", res.data.jwt);
            setHomeRedirect(true)
            }
        }).catch(err => { 
            setLoginError(true);
            console.error(err);
        });
  }

  return (
    <div style={{
      position: 'absolute', left: '50%', top: '50%',
      transform: 'translate(-50%, -50%)'
    }}>
      {/* {localStorage.getItem('jwt') &&  <Redirect to = {{ pathname: "/" }} />} */}
      { homeRedirect &&  <Redirect to = {{ pathname: "/" }} />}
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
            <Button disabled={!validateForm()} type='submit'  onClick={handleSubmit}>Login</Button>
            <a onClick={event =>  setSignUpRedirect(true)}><br/><br/>Create an account.</a>
            { signUpRedirect &&  <Redirect to = {{ pathname: "/signup" }} />}
          </FormField>
      </Pane>
    </div>
  );
}