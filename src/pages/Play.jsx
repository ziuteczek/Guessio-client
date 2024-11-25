import { useEffect, useRef, useState } from "react";
import useWebSocket from "react-use-websocket";
import Board from "../components/Board";

export default Play;
function Player({ nick, points, avatarPath }) {
  return (
    <div className="player">
      <p className="player__name">{nick}</p>
      <p className="player__score">{points} pkt.</p>
      <img className="player__avatar" alt="" src={avatarPath} />
    </div>
  );
}
function Play() {
  const [boardState, setBoardState] = useState({});
  const [players, setPlayers] = useState([]);

  const { userID, code } = JSON.parse(localStorage.getItem("user"));

  const { sendMessage, lastMessage, readyState } = useWebSocket(
    `http://localhost:4000/enter-game?userid=${userID}&code=${code}`
  );

  useEffect(() => {
    if (!lastMessage) {
      return;
    }

    const update = JSON.parse(lastMessage.data);

    switch (update.type) {
      case "update":
        setPlayers(update.players);
        break;
      default:
        console.log("vamos a la plaja");
    }
  }, [lastMessage]);

  useEffect(() => {
    console.log(readyState);
  }, [readyState]);
  // useEffect(() => {
  //   if (lastMessage === null) {
  //     return;
  //   }
  //   setBoardState(lastMessage);
  // }, [lastMessage]);

  return (
    <div className="game">
      <div className="game__players">
        {players.map((player) => (
          <Player points={player.points} nick={player.nick} />
        ))}
      </div>
      <Board send={sendMessage} />
      <div className="game__chat"></div>
    </div>
  );
}
