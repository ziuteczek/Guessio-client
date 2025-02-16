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

      switch (update.type) {
        case "full":
          setGameState((oldGameState) => ({
            ...oldGameState,
            players: update.players,
            messages: update.chat,
            drawingMode: update.allowDrawing,
            roundEnd: update.round.endDate,
            phase: update.round.type,
            isAdmin: update.isAdmin,
            categories: update.categories,
            settings: update.settings,
          }));
        // eslint-disable-next-line no-fallthrough
        case "board":
          const painting = new Blob([update.board?.buffer], { type: "image/png" });

          setGameState((oldGameState) => ({
            ...oldGameState,
            paintingURL: URL.createObjectURL(painting),
          }));
          break;
        case "new message":
          console.log(update);
          setGameState((oldGameState) => ({
            ...oldGameState,
            messages: [...oldGameState.messages, update.message],
          }));
          break;
        case "player list":
          setGameState((oldGameState) => ({
            ...oldGameState,
            players: update.players,
          }));
          break;
        default:
          console.log(`Undefined update type: ${update.type}`);
      }
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
