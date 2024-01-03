import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { MEMBERS_OF_GROUP, CASH_GAMES_IN_GROUP } from "../graphql/queries";

export const Clubdetail = () => {
  const { clubId } = useParams();

  // Use clubId to fetch club details or perform other actions
  const {
    loading: loadingMembers,
    error: errorMembers,
    data: dataMembers,
  } = useQuery(MEMBERS_OF_GROUP, {
    variables: { groupId: clubId },
  });

  const {
    loading: loadingGames,
    error: errorGames,
    data: dataGames,
  } = useQuery(CASH_GAMES_IN_GROUP, {
    variables: { groupId: clubId },
  });

  if (loadingMembers || loadingGames) return <p>Loading...</p>;
  if (errorMembers) return <p>Error loading members: {errorMembers.message}</p>;
  if (errorGames) return <p>Error loading games: {errorGames.message}</p>;

  console.log(dataGames);
  return (
    <div>
      <Link to={`/`}>
        <button>HOME BUTTON</button>
      </Link>
      <h1>Club Detail</h1>
      <p>Club ID: {clubId}</p>
      <div>
        <h2>Members:</h2>
        {dataMembers?.membersOfGroup.map((member) => (
          <div key={member.userId}>
            <h3>{member.name}</h3>
            <p>{member.email}</p>
            <p>{member.userId}</p>
          </div>
        ))}
      </div>
      {/* Add rendering for games data here */}
      {/* Example: */}
      {dataGames?.cashGamesInGroup.map((game) => (
        <div key={game.gameId}>
          <h3>{game.name}</h3>
          {/* Display other game details */}
        </div>
      ))}
    </div>
  );
};
