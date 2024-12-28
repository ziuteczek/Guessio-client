import Board from "../components/Board";
import PlayersList from "../components/PlayersList";
import useGameSocket from "../api/useGameSocket";
import Chat from "../components/Chat";
import Timer from "../components/Timer";
import StartBtn from "../components/StartBtn";

export default Play;
function Play() {
  const { userID, code } = JSON.parse(localStorage.getItem("user"));

  const { send, drawingMode, players, paintingURL, messages, roundEnd, isAdmin, phase } = useGameSocket(userID, code);

  console.log(isAdmin && phase === "lobby");

  return (
    <div className="game">
      <PlayersList players={players} />
      <Board send={send} drawingMode={drawingMode} paintingURL={paintingURL} />
      <Chat send={send} messages={messages} />
      <Timer timerStop={roundEnd} />
      <StartBtn send={send} visible={isAdmin && phase === "lobby"} />
    </div>
  );
}
