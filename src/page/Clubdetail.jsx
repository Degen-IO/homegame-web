import React from "react";
import { useParams } from "react-router-dom";

export const Clubdetail = () => {
  const params = useParams();
  const clubId = params.clubId; // Or destructure directly: const { clubId } = useParams();

  // Use clubId to fetch club details or perform other actions

  return (
    <div>
      <h1>Club Detail</h1>
      <p>Club ID: {clubId}</p>
      {/* Render additional club details here */}
    </div>
  );
};
