import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { REQUEST_TO_JOIN_GROUP } from "../graphql/mutations";

export const RequestToJoinClub = () => {
  const [groupId, setGroupId] = useState("");
  const [joinPassword, setJoinPassword] = useState("");

  const [requestToJoinGroup, { data, loading, error }] = useMutation(
    REQUEST_TO_JOIN_GROUP
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await requestToJoinGroup({
        variables: {
          groupId,
          joinPassword,
        },
      });
      // Handle success (e.g., showing a success message)
    } catch (err) {
      // Handle error
    }
  };

  return (
    <div>
      <h1>Request to Join Club</h1>
      {error && <p>Error requesting to join club: {error.message}</p>}
      {data && <p>Request sent successfully!</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="groupId">Group ID:</label>
          <input
            id="groupId"
            type="text"
            value={groupId}
            onChange={(e) => setGroupId(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="joinPassword">Join Password:</label>
          <input
            id="joinPassword"
            type="password"
            value={joinPassword}
            onChange={(e) => setJoinPassword(e.target.value)}
          />
        </div>
        <button type="submit" disabled={loading}>
          Request to Join
        </button>
      </form>
    </div>
  );
};
