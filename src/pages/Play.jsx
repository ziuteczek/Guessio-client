import Board from "../components/Board";
import PlayersList from "../components/PlayersList";
import useGameSocket from "../api/useGameSocket";
import Chat from "../components/Chat";

export default Play;
function Play() {
  const { userID, code } = JSON.parse(localStorage.getItem("user"));

  const { send, drawingMode, players, paintingURL, messages } = useGameSocket(userID, code);

  return (
    <div className="game">
      <div className="game__players">
        <PlayersList players={players} />
      </div>
      <Board send={send} drawingMode={drawingMode} paintingURL={paintingURL} />
      <Chat send={send} messages={messages}/>
    </div>
  );
}
