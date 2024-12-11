import { deserialize } from "bson";
import { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";

function useGameSocket(userID, code) {
  const { sendMessage, lastMessage, readyState } = useWebSocket(
    `${process.env.REACT_APP_SERVER}/enter-game?userid=${userID}&code=${code}`
  );

  const [gameState, setGameState] = useState({});

  useEffect(() => {
    if (!lastMessage) {
      return;
    }

    (async () => {
      const update = deserialize(await lastMessage.data.arrayBuffer());

      const painting = new Blob([update.board?.buffer], { type: "image/png" });

      console.log(update);

      setGameState((gameState) => ({
        ...gameState,
        players: update.players,
        drawingMode: update.drawingMode,
        paintingURL: URL.createObjectURL(painting),
      }));
    })();
  }, [lastMessage]);

  useEffect(() => {
    console.log(readyState);
  }, [readyState]);

  return { send: sendMessage, ...gameState };
}
export default useGameSocket;
