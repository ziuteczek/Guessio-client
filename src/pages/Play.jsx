import { useEffect, useState } from "react";
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
  const { userID, code } = JSON.parse(localStorage.getItem("user"));

  const { sendMessage, lastMessage, readyState } = useWebSocket(
    `http://localhost:4000/enter-game?userid=${2137}&code=${123456}`
  );

  useEffect(() => {
    if (lastMessage === undefined) {
      return;
    }
  }, [lastMessage]);

  let mouseDown = false;

  // useEffect(() => {
  //   if (lastMessage === null) {
  //     return;
  //   }
  //   setBoardState(lastMessage);
  // }, [lastMessage]);

  return (
    <div className="game">
      <div className="game__players">
        <Player nick="Stasio" points="3214" avatarPath="" />
      </div>
      <Board send={sendMessage} />
      <div className="game__chat"></div>
    </div>
  );
}
