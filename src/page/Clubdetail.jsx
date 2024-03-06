import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import {
  MEMBERS_OF_GROUP,
  CASH_GAMES_IN_GROUP,
  TOURNAMENT_GAMES_IN_GROUP,
  QUERY_PENDING_MEMBERS,
} from "../graphql/queries";
import { Gamedetail } from "./Gamedetail";

export const Clubdetail = () => {
  const { clubId } = useParams();
  const navigate = useNavigate();

  const handleNavigate = (gameId, typeName) => {
    navigate(`/club/${clubId}/${typeName}/${gameId}`);
  };

  // Use clubId to fetch club details or perform other actions
  const {
    loading: loadingMembers,
    error: errorMembers,
    data: dataMembers,
  } = useQuery(MEMBERS_OF_GROUP, {
    variables: { groupId: clubId },
  });

  const {
    loading: loadingCashGames,
    error: errorCashGames,
    data: dataCashGames,
  } = useQuery(CASH_GAMES_IN_GROUP, {
    variables: { groupId: clubId },
  });

  const {
    loading: loadingTournamentGames,
    error: errorTournamentGames,
    data: dataTournamentGames,
  } = useQuery(TOURNAMENT_GAMES_IN_GROUP, {
    variables: { groupId: clubId },
  });

  const {
    loading: loadingPendingMembers,
    error: errorPendingMembers,
    data: dataPendingMembers,
  } = useQuery(QUERY_PENDING_MEMBERS, {
    variables: { groupId: clubId },
  });

  if (loadingMembers || loadingCashGames) return <p>Loading...</p>;
  if (errorMembers) return <p>Error loading members: {errorMembers.message}</p>;
  if (errorCashGames)
    return <p>Error loading games: {errorCashGames.message}</p>;

  console.log(dataCashGames);
  console.log(dataTournamentGames);
  return (
    <div>
      <Link to={`/`}>
        <button>HOME BUTTON</button>
      </Link>
      <h1>Club Detail</h1>
      <p>Club ID: {clubId}</p>
      <Link to={`/${clubId}/create-game`}>Create New Game</Link>
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
      <div>
        <h2>Games</h2>
        <h3>Cash Games</h3>
        {/* Add rendering for games data here */}
        {/* Example: */}
        {dataCashGames?.cashGamesInGroup.length > 0 ? (
          dataCashGames.cashGamesInGroup.map((game) => (
            <div key={game.gameId}>
              <button onClick={() => handleNavigate(game.gameId, "cash")}>
                {game.name}
              </button>
              {/* Display other game details */}
            </div>
          ))
        ) : (
          <p>No cash games</p> // This will be rendered if there are no cash games
        )}
        <h3>Tournament Games: </h3>
        {dataTournamentGames?.tournamentGamesInGroup.length > 0 ? (
          dataTournamentGames.tournamentGamesInGroup.map((game) => (
            <div key={game.gameId}>
              <button onClick={() => handleNavigate(game.gameId, "tournament")}>
                {game.name}
              </button>
              {/* Display other game details */}
            </div>
          ))
        ) : (
          <p>No tournament games</p> // This will be rendered if there are no cash games
        )}
      </div>
      <div>
        <h2>Pending Members:</h2>
        {dataPendingMembers?.pendingMembers?.length > 0 ? (
          dataPendingMembers.pendingMembers.map((member) => (
            <div key={member.userId}>
              <h3>{member.name}</h3>
            </div>
          ))
        ) : (
          <p>No pending members</p>
        )}
      </div>
    </div>
  );
};
