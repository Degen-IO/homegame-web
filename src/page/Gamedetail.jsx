import React from "react";
//we can access the gameId and typeName from the URL params (because they weren't passed as props from the handleNavigate function in Clubdetail)
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_GAME, QUERY_PLAYERS_IN_GAME } from "../graphql/queries";

export const Gamedetail = () => {
  const { gameId, typeName } = useParams();
  console.log("----------", gameId, typeName);

  // Query the Game details
  const {
    loading: gameLoading,
    error: gameError,
    data: gameData,
  } = useQuery(QUERY_GAME, {
    variables: { gameId, gameType: typeName },
  });

  // Query the Players currently registered
  const {
    loading: playersLoading,
    error: playersError,
    data: playersData,
  } = useQuery(QUERY_PLAYERS_IN_GAME, {
    variables: { gameId, gameType: typeName },
  });

  if (gameLoading || playersLoading) return <p>Loading...</p>;
  if (gameError || playersError) return <p>Error :</p>;

  const game = gameData.game;
  const players = playersData.playersInGame;
  //Buttons for join/leave game

  // You can use gameId and typeName here to fetch or display specific game details
  return (
    <div>
      <h2>
        Gamedetail for {typeName} game with ID {gameId}
      </h2>
      {Object.entries(game).map(([key, value]) =>
        value !== null ? (
          <div key={key}>
            <strong>{key}:</strong> {value}
          </div>
        ) : null
      )}
      <h3>Players:</h3>
      {players.map((player, index) => (
        <div key={index}>
          <strong>User: </strong> {player.userId}
          <strong>Player ID:</strong> {player.playerId}
          <strong>Seat Number:</strong> {player.seatNumber}
        </div>
      ))}
    </div>
  );
};
