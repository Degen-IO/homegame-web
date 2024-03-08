import React from "react";
//we can access the gameId and typeName from the URL params (because they weren't passed as props from the handleNavigate function in Clubdetail)
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { QUERY_GAME, QUERY_PLAYERS_IN_GAME } from "../graphql/queries";
import { JOIN_GAME, LEAVE_GAME } from "../graphql/mutations";
export const Gamedetail = () => {
  const { gameId, typeName } = useParams();
  console.log("----------", gameId, typeName);

  //Buttons for join/leave game
  const [joinGame] = useMutation(JOIN_GAME);
  const [leaveGame] = useMutation(LEAVE_GAME);

  const handleJoinGame = async () => {
    try {
      await joinGame({ variables: { gameId, gameType: typeName } });
      alert("Successfully joined the game");
    } catch (error) {
      alert(`Failed to join the game: ${error.message}`);
    }
  };

  const handleLeaveGame = async () => {
    try {
      await leaveGame({ variables: { gameId, gameType: typeName } });
      alert("Successfully left the game");
    } catch (error) {
      alert(`Failed to leave the game: ${error.message}`);
    }
  };

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
  console.log("----------------------", game);
  const players = playersData.playersInGame;

  // You can use gameId and typeName here to fetch or display specific game details
  return (
    <div>
      <button onClick={handleJoinGame}>Join Game</button>
      <button onClick={handleLeaveGame}>Leave Game</button>
      <h2>
        Gamedetail for {typeName} game with ID {gameId}
      </h2>
      {/* game details if not null */}
      {Object.entries(game).map(([key, value]) =>
        value !== null ? (
          <div key={key}>
            <strong>{key}:</strong>{" "}
            {key === "startDateTime"
              ? new Date(Number(value)).toLocaleString()
              : value}
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
