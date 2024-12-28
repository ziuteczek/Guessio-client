import { serialize } from "bson";

function StartBtn({ send, visible }) {
  const startGame = () => {
    send(serialize({ type: "start game" }));
  };
  return visible && <button onClick={startGame}>Start the game</button>;
}
export default StartBtn;
