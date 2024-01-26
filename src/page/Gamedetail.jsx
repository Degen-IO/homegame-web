import React from "react";

export const Gamedetail = ({ gameId, typeName }) => {
  // You can use gameId and typeName to fetch or display specific game details
  return (
    <div>
      Gamedetail for {typeName} with ID {gameId}
    </div>
  );
};
