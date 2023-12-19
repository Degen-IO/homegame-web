import * as React from "react";
import { useState } from "react";
import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";

import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";

import Auth from "../utils/auth";

function TestLogin() {
  const [formState, setFormState] = useState({ email: "", password: "" }); // store email and password in formState
  //login function, destructure error and data from payload
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    console.log(event.target.value);
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
    console.log(formState);
  };

  // submit form (submit button)
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    // lets try to login, call the login mutation, pass in formState (state variable holding variables for email & password)
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token); //  calls login method from auth, pass in the token (from local storage)
      console.log("YOU GOT LOGGED IN");
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: "",
      password: "",
    });
  };
  return (
    <>
      <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
        <input
          type="email"
          name="email"
          value={formState.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          value={formState.password}
          onChange={handleChange}
        />

        <div className="d-flex justify-content-between mx-3 mb-4">
          <MDBCheckbox
            name="flexCheck"
            value=""
            id="flexCheckDefault"
            label="Remember me"
          />
          <a href="!#">Forgot password?</a>
        </div>

        <MDBBtn onClick={handleFormSubmit} className="mb-4">
          Sign in
        </MDBBtn>

        <div className="text-center">
          <p>
            Not a member? <a href="#!">Register</a>
          </p>
          <p>or sign up with:</p>

          <div
            className="d-flex justify-content-between mx-auto"
            style={{ width: "40%" }}
          >
            <MDBBtn
              tag="a"
              color="none"
              className="m-1"
              style={{ color: "#1266f1" }}
            >
              <MDBIcon fab icon="facebook-f" size="sm" />
            </MDBBtn>

            <MDBBtn
              tag="a"
              color="none"
              className="m-1"
              style={{ color: "#1266f1" }}
            >
              <MDBIcon fab icon="twitter" size="sm" />
            </MDBBtn>

            <MDBBtn
              tag="a"
              color="none"
              className="m-1"
              style={{ color: "#1266f1" }}
            >
              <MDBIcon fab icon="google" size="sm" />
            </MDBBtn>

            <MDBBtn
              tag="a"
              color="none"
              className="m-1"
              style={{ color: "#1266f1" }}
            >
              <MDBIcon fab icon="github" size="sm" />
            </MDBBtn>
          </div>
        </div>
      </MDBContainer>
    </>
  );
}

export default TestLogin;
