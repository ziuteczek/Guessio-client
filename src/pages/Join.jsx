import { useState } from "react";
import useWebSocket from "react-use-websocket";

export default Join;

const webSocketConnect = () => {
  const { sendMessage, lastMessage, readyState } = useWebSocket(
    "wss://echo.websocket.org"
  );
};

function Join() {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  return (
    <div className="join-form__container">
      <form className="join-form">
        <label for="nick">name</label>
        <input
          type="text"
          maxlength="10"
          id="nick"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label for="code">code</label>
        <input
          name="code"
          maxlength="6"
          id="code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <button>join</button>
      </form>
    </div>
  );
}
