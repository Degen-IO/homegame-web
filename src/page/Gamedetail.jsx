import React from "react";
//we can access the gameId and typeName from the URL params (because they weren't passed as props from the handleNavigate function in Clubdetail)
import { useParams } from "react-router-dom";

export const Gamedetail = () => {
  const { gameId, typeName } = useParams();

  // You can use gameId and typeName here to fetch or display specific game details
  return (
    <div>
      Gamedetail for {typeName} with ID {gameId}
    </div>
  );
};
