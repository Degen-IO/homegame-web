import React from "react";
import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_USERS_POKERGROUPS } from "../graphql/queries";
import { Link } from "react-router-dom";
// User info
const user = Auth.getUser()?.data || {}; // Fallback to empty object
const { userId, email, name } = user;

// Gets info for clubs -- TO DO: different component that makes cards/buttons?
export function ClubInfo({ userId }) {
  const { loading, error, data } = useQuery(QUERY_USERS_POKERGROUPS, {
    variables: { userId },
  });
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  if (data)
    return (
      <>
        {data?.pokerGroups.map((group) => (
          <Link key={group.groupId} to={`/club/${group.groupId}`}>
            <button className="club-button">{group.name}</button>
          </Link>
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
