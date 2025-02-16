import { createContext, useRef } from "react";

import Board from "../components/Board";
import PlayersList from "../components/PlayersList";
import useGameSocket from "../api/useGameSocket";
import Chat from "../components/Chat";
import Timer from "../components/Timer";
import StartBtn from "../components/StartBtn";
import Settings from "../components/settings/Settings";

export const sendContex = createContext(null);

function Play() {
  const { userID, code } = JSON.parse(localStorage.getItem("user"));
  const settingsRef = useRef(null);

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
    settings,
  } = useGameSocket(userID, code);

  settingsRef.current = settings;

  return (
    <div className="game">
      <sendContex.Provider value={send}>
        <PlayersList players={players} />
        <Board send={send} drawingMode={drawingMode} paintingURL={paintingURL} />
        <Chat send={send} messages={messages} />
        <Timer timerStop={roundEnd} />
        <StartBtn send={send} visible={isAdmin && phase === "lobby"} />
        <Settings categoriesList={categories} settingsRef={settingsRef} />
      </sendContex.Provider>
    </div>
  );
}
export default Play;
