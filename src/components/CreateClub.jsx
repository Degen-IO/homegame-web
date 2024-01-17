import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_POKER_GROUP } from "../graphql/mutations";

export const CreateClub = () => {
  const [name, setName] = useState("");
  const [joinPassword, setJoinPassword] = useState("");

  const [createPokerGroup, { data, loading, error }] =
    useMutation(CREATE_POKER_GROUP);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPokerGroup({
        variables: {
          name,
          joinPassword,
        },
      });
      // Handle success
    } catch (err) {
      // Handle error
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Create Club</h1>
      {error && <p>Error creating club: {error.message}</p>}
      {data && <p>Club created successfully!</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Club Name:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
          Create Club
        </button>
      </form>
    </div>
  );
};
