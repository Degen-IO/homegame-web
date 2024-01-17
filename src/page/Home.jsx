import React from "react";
import { TestLogin, ClubInfo, CreateClub } from "../components";
import Auth from "../utils/auth";
import Button from "react-bootstrap/Button";
import { RequestToJoinClub } from "../components/RequestToJoinClub";

export const Home = () => {
  let user = Auth.getUser();
  const isLoggedIn = Auth.loggedIn();

  return (
    <>
      {/* Login Check */}
      {isLoggedIn ? (
        <>
          <p>Already logged in! Welcome {user ? user.data.name : ""}</p>
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
          <p>NOT logged in!</p>
          <TestLogin />
        </>
      )}
    </>
  );
};
