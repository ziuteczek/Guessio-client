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

      console.log(update);

      const painting = new Blob([update.board?.buffer], { type: "image/png" });

      setGameState((gameState) => ({
        ...gameState,
        players: update.players,
        messages: update.chat,
        drawingMode: update.allowDrawing,
        roundEnd: update.round.endDate,
        phase: update.round.type,
        isAdmin: update.isAdmin,
        paintingURL: URL.createObjectURL(painting),
      }));
    })();
  }, [lastMessage]);

  useEffect(() => {
    console.log(readyState);
  }, [readyState]);

  useEffect(() => {
    console.log(gameState);
  }, [gameState]);

  return { send: sendMessage, ...gameState };
}
export default useGameSocket;
