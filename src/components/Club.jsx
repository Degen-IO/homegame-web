import React from "react";
import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_USERS_POKERGROUPS } from "../graphql/queries";
// User info
const user = Auth.getUser()?.data || {}; // Fallback to empty object
const { userId, email, name } = user;

// Gets info for clubs -- TO DO: different component that makes cards/buttons?
function ClubInfo(userId) {
  console.log("my userId is", userId);
  const { loading, error, data } = useQuery(QUERY_USERS_POKERGROUPS, {
    variables: { userId },
  });
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  console.log(data);
  return (
    <>
      {data?.pokerGroups.map((group) => (
        <div key={group.groupId}>
          <p>{group.name}</p>
        </div>
      ))}
    </>
  );
}

export const Club = () => {
  if (userId) {
    return (
      <div className="container">
        <div>
          <h1>User info:</h1>
          <p>User ID : {userId}</p>
          <p>Email : {email}</p>
          <p>Name: {name}</p>
        </div>
        {/* Club Info */}
        <div>
          <h1> Club Info:</h1>
          {ClubInfo(userId)}
        </div>
        <h1> Games info :</h1>
        <ul>
          <li>Game 1</li>
          <li>Game 2</li>
        </ul>
      </div>
    );
  } else {
    return <p>An error has occurred</p>;
  }
};
