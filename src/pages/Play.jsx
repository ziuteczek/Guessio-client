import { useEffect, useRef, useState } from "react";
import { deserialize } from "bson";

import useWebSocket from "react-use-websocket";
import Board from "../components/Board";
import PlayersList from "../components/PlayersList";

const Buffer = require("buffer/").Buffer;

export default Play;
function Play() {
  const [boardState, setBoardState] = useState({});
  const [players, setPlayers] = useState([]);
  const [drawingMode, setDrawingMode] = useState(true);

  const [paitingURL, setPaitingURL] = useState("");

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
          const blob = new Blob([update.board?.buffer], { type: "image/png" });

          setPlayers(update.players);
          setDrawingMode(update.drawingMode);
          setPaitingURL(URL.createObjectURL(blob));

          console.log(update);
          break;
        default:
          console.log(`unknown update type: ${update.type}`);
      }
    })();
  }, [lastMessage]);

  useEffect(() => {
    console.log(readyState);
  }, [readyState]);

  return (
    <div className="game">
      <div className="game__players">
        <PlayersList players={players} />
      </div>
      <Board
        send={sendMessage}
        drawingMode={drawingMode}
        paitingURL={drawingMode ? "" : paitingURL}
      />
      <div className="game__chat"></div>
    </div>
  );
}
