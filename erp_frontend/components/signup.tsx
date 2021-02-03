import React, { useState } from "react";
import { Button, FormField, TextInput, Pane, Heading } from 'evergreen-ui'
import {signUpPost} from "../utils/datafetcher"
import { Auth } from "../Auth";

export default function Signup(this: any) {

  const [email, setEmail] = useState("");
  const [signupError, setSignupError] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [homeRedirect, setHomeRedirect] = useState(false);
  const [signUpRedirect, setSignUpRedirect] = useState(false);
  const [password, setPassword] = useState("");
  
  function validateForm() {
    return email.length > 0 && password.length > 8;
  }

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    signUpPost(email, password)
    .then(res => { 
        if (res.status === 200) {
          localStorage.setItem("jwt", res.data.jwt);
          window.location.href = "/dashboard"
          return
        }
        setSignupError(true);
    })
    .catch(err => { 
        setSignupError(true);
        console.error(err);
    });
  }

  if(Auth.isAuthenticated()) {
    window.location.href = "/dashboard"
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
              <Heading marginTop={15} marginBottom={15} size={700}>Sign Up</Heading>
                <div style={{paddingTop: '20px'}}>
                  <TextInput
                    name="Email"
                    placeholder="Email"
                    value={email}
                    onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setEmail(e.target.value)}
                  />
                </div>
                <Pane style={{padding: '20px', paddingBottom: '40px'}}>
                    <TextInput
                    required
                    name="Password"
                    placeholder="Password"
                    value={password}
                    type="password"
                    onChange={(e: { target: { value: React.SetStateAction<string>; } }) => {
                        setPassword(e.target.value)
                        setPasswordTouched(true)
                    }}
                    />
                    {passwordTouched && password.length < 8 &&  <FormField label='' validationMessage='Password should be more than 8 characters.' />}
                    {signupError &&  <FormField label='' validationMessage='Email already taken.' />}
                </Pane>
                <Button disabled={!validateForm()} type='submit' appearance="primary" onClick={handleSubmit}>Sign Up</Button>
                <Button type='submit' marginLeft={15} onClick={ () => {window.location.href = "/login"}}>Go to Login</Button>
                <Pane marginBottom={15}></Pane>
            </FormField>
        </Pane>
      </Pane>
  );
}