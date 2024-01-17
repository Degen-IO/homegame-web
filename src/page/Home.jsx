import React from "react";
import { TestLogin, ClubInfo, CreateClub, Register } from "../components";
import Auth from "../utils/auth";
import Button from "react-bootstrap/Button";
import { RequestToJoinClub } from "../components/RequestToJoinClub";

export const Home = () => {
  let user = Auth.getUser();
  const isLoggedIn = Auth.loggedIn();

  return (
    <>
      <h1>Welcome to HomeGame</h1>
      {/* Login Check */}
      {isLoggedIn ? (
        <>
          <p>
            Just a logger: Already logged in! Welcome{" "}
            {user ? user.data.name : ""}
          </p>
          {/* Render components or content for logged-in users */}
          {/* Example: <UserProfile /> or <Dashboard /> */}
          <ClubInfo userId={user.data.userId} />
          <CreateClub />
          <RequestToJoinClub />
          <Button
            onClick={() => {
              Auth.logout();
            }}
            style={{ backgroundColor: "#337ca0" }}
            className="buttonBlue"
            variant="outline-dark"
          >
            Log Out
          </Button>
        </>
      ) : (
        <>
          <p>Just a logger: NOT logged in!</p>
          <TestLogin />
          <p>Or sign up below:</p>
          <Register />
        </>
      )}
    </>
  );
};
