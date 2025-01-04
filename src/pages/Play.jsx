import { useState } from "react";

import Board from "../components/Board";
import PlayersList from "../components/PlayersList";
import useGameSocket from "../api/useGameSocket";
import Chat from "../components/Chat";
import Timer from "../components/Timer";
import StartBtn from "../components/StartBtn";
import Settings from "../components/Settings";

function Play() {
  const { userID, code } = JSON.parse(localStorage.getItem("user"));

  const {
    send,
    drawingMode,
    players,
    paintingURL,
    messages,
    roundEnd,
    isAdmin,
    phase,
    categories,
  } = useGameSocket(userID, code);

  return (
    <div className="game">
      <PlayersList players={players} />
      <Board send={send} drawingMode={drawingMode} paintingURL={paintingURL} />
      <Chat send={send} messages={messages} />
      <Timer timerStop={roundEnd} />
      <StartBtn send={send} visible={isAdmin && phase === "lobby"} />
      <Settings categoriesList={categories} send={send} />
    </div>
  );
}
export default Play;
