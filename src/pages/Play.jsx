import { useEffect, useRef, useState } from "react";

import Board from "../components/Board";
import PlayersList from "../components/PlayersList";
import useGameSocket from "../api/useGameSocket";

export default Play;
function Play() {
  const { userID, code } = JSON.parse(localStorage.getItem("user"));

  const { send, drawingMode, players, paintingURL } = useGameSocket(
    userID,
    code
  );

  return (
    <div className="game">
      <div className="game__players">
        <PlayersList players={players} />
      </div>
      <Board
        send={send}
        drawingMode={drawingMode}
        paintingURL={drawingMode ? "" : paintingURL}
      />
      <div className="game__chat"></div>
    </div>
  );
}
