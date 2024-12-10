import { deserialize } from "bson";
import { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";

function useGameSocket(userID, code) {
  const { sendMessage, lastMessage, readyState } = useWebSocket(
    `http://localhost:4000/enter-game?userid=${userID}&code=${code}`
  );

  const [gameState, setGameState] = useState({});

  useEffect(() => {
    if (!lastMessage) {
      return;
    }

    (async () => {
      const update = deserialize(await lastMessage.data.arrayBuffer());

      const painting = new Blob([update.board?.buffer], { type: "image/png" });

      setGameState((gameState) => ({
        ...gameState,
        players: update.players,
        drawingMode: update.drawingMode,
        paintingURL: URL.createObjectURL(painting),
      }));
      console.log(gameState);
    })();
  }, [lastMessage]);

  useEffect(() => {
    console.log(readyState);
  }, [readyState]);

  return { send: sendMessage, ...gameState };
}
export default useGameSocket;
