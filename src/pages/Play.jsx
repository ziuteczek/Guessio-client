import { useEffect, useRef, useState } from "react";
import { deserialize } from "bson";

import useWebSocket from "react-use-websocket";
import Board from "../components/Board";

const Buffer = require("buffer/").Buffer;

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

    (async () => {
      const updateBuff = await lastMessage.data.arrayBuffer();
      const update = deserialize(updateBuff);

      switch (update.type) {
        case "update":
          setPlayers(update.players);
          const blob = new Blob([update.board?.buffer], { type: "image/png" });
          const boardURL = URL.createObjectURL(blob);

          break;
        default:
          console.log(`unknown update type ${update.type}`);
      }
    })();
  }, [lastMessage]);

  useEffect(() => {
    console.log(readyState);
  }, [readyState]);

  return (
    <div className="game">
      <div className="game__players">
        {players.map((player, i) => (
          <Player points={player.points} nick={player.nick} key={i} />
        ))}
      </div>
      <Board send={sendMessage} />
      <div className="game__chat"></div>
    </div>
  );
}
