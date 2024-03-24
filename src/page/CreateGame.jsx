import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CREATE_TOURNAMENT_GAME, CREATE_CASH_GAME } from "../graphql/mutations";

export const CreateGame = () => {
  const { groupId } = useParams();
  const [gameType, setGameType] = useState("tournament");
  const [formData, setFormData] = useState({});
  const [isDurationManual, setIsDurationManual] = useState(false);

  useEffect(() => {
    if (groupId) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        groupId: parseInt(groupId, 10),
      }));
    }
  }, [groupId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    if (name === "duration" && value === "manual") {
      setIsDurationManual(true);
      setFormData({ ...formData, duration: "" });
    } else if (name === "duration") {
      setIsDurationManual(false);
    }
  };

  const [createTournamentGame] = useMutation(CREATE_TOURNAMENT_GAME);
  const [createCashGame] = useMutation(CREATE_CASH_GAME);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Common fields
    const variables = {
      ...formData,
      name: formData.name,
      groupId: parseInt(groupId, 10),
      startDateTime: new Date(formData.startDateTime).toISOString(),
      playersPerTable: parseInt(formData.playersPerTable, 10),
      startingChips: parseFloat(formData.startingChips),
      // Specific fields for tournament and cash games
      ...(gameType === "tournament"
        ? {
            numberOfRebuys: parseInt(formData.numberOfRebuys, 10),
            addOn: formData.addOn || false,
            rebuyPeriod: formData.rebuyPeriod,
            gameSpeed: formData.gameSpeed,
            lateRegistrationDuration: formData.lateRegistrationDuration,
          }
        : {
            // Ensure blinds are parsed as floats
            blindsSmall: parseFloat(formData.blindsSmall),
            blindsBig: parseFloat(formData.blindsBig),
            // Include duration field for cash games
            duration: formData.duration,
          }),
    };
    
    if (gameType === "tournament") {
      createTournamentGame({ variables })
        .then(({ data }) => {
          console.log(
            "You created a tournament game",
            data.createTournamentGame
          );
        })
        .catch((error) => {
          console.error("Error creating tournament game", error);
        });
    } else {
      createCashGame({ variables })
        .then(({ data }) => {
          console.log("You created a cash game", data.createCashGame);
        })
        .catch((error) => {
          console.error("Error creating cash game", error);
        });
    }
  };

  const handleGameTypeChange = (e) => {
    setGameType(e.target.value);
    setFormData({});
  };

  return (
    <div>
      <Link to={`/club/${groupId}`}>
        <button>Back to Club</button>
      </Link>
      <h1>Create Game</h1>
      <form onSubmit={handleSubmit}>
        {/* Game Type Selection */}
        <div>
          <label>
            <input
              type="radio"
              value="tournament"
              checked={gameType === "tournament"}
              onChange={handleGameTypeChange}
            />{" "}
            Tournament
          </label>
          <label>
            <input
              type="radio"
              value="cash"
              checked={gameType === "cash"}
              onChange={handleGameTypeChange}
            />{" "}
            Cash Game
          </label>
        </div>

        {/* Shared Fields */}
        <input name="name" placeholder="Game Name" onChange={handleChange} />
        <input
          name="startDateTime"
          placeholder="Start Date Time"
          type="datetime-local"
          onChange={handleChange}
        />
        <input
          name="playersPerTable"
          placeholder="Players per Table"
          type="number"
          onChange={handleChange}
        />

        {/* Conditional Tournament Fields */}
        {gameType === "tournament" && (
          <>
            <input
              name="numberOfRebuys"
              placeholder="Number of Rebuys"
              type="number"
              onChange={handleChange}
            />
            <select name="rebuyPeriod" onChange={handleChange} defaultValue="">
              <option value="" disabled>
                Select Rebuy Period
              </option>
              <option value="_30min">30 Minutes</option>
              <option value="_60min">60 Minutes</option>
              <option value="_90min">90 Minutes</option>
              <option value="_120min">120 Minutes</option>
              <option value="none">None</option>
            </select>
            <label>
              Add On:
              <input name="addOn" type="checkbox" onChange={handleChange} />
            </label>
            <input
              name="startingChips"
              placeholder="Starting Chips"
              type="number"
              onChange={handleChange}
            />
            {/* Game Speed */}
            <select name="gameSpeed" onChange={handleChange} defaultValue="">
              <option value="" disabled>
                Select Game Speed
              </option>
              <option value="slow">Slow</option>
              <option value="medium">Medium</option>
              <option value="fast">Fast</option>
              <option value="ridiculous">Ridiculous</option>
            </select>
            {/* Late Reg */}
            <select
              name="lateRegistrationDuration"
              onChange={handleChange}
              defaultValue=""
            >
              <option value="" disabled>
                Select Late Registration Duration
              </option>
              <option value="_30min">30 Minutes</option>
              <option value="_60min">60 Minutes</option>
              <option value="_90min">90 Minutes</option>
              <option value="none">None</option>
            </select>
          </>
        )}

        {/* Conditional Cash Game Fields */}
        {gameType === "cash" && (
          <>
            <input
              name="startingChips"
              placeholder="Starting Chips"
              type="number"
              onChange={handleChange}
            />
            <input
              name="blindsSmall"
              placeholder="Small Blind"
              type="number"
              onChange={handleChange}
            />
            <input
              name="blindsBig"
              placeholder="Big Blind"
              type="number"
              onChange={handleChange}
            />
            {/* Add a field for 'duration' if required */}
            <select name="duration" onChange={handleChange} defaultValue="">
              <option value="" disabled>
                Select Duration
              </option>
              <option value="_1hr">1 Hour</option>
              <option value="_2hr">2 Hours</option>
              <option value="_3hr">3 Hours</option>
              <option value="_4hr">4 Hours</option>
              <option value="unlimited">Unlimited</option>
              <option value="manual">Manual</option>
            </select>
            {/* TO DO -- test manual? */}
            {isDurationManual && (
              <input
                name="manualDuration"
                placeholder="Enter Duration"
                onChange={handleChange}
                type="text"
              />
            )}
          </>
        )}

        <button type="submit">Create Game</button>
      </form>
    </div>
  );
};
