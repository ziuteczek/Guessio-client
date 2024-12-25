import { serialize } from "bson";
import { useState } from "react";

function Chat({ send, messages = [] }) {
  const [message, setMessage] = useState("");

  const sendMessage = (e) => {
    e?.preventDefault();

    if (message === "") {
      return;
    }

    const messageBSON = serialize({
      type: "message",
      content: message,
    });

    setMessage("");

    send(messageBSON);
  };

  return (
    <div className="game__chat">
      <div className="chat__logs">
        {messages.map((msg) => (
          <p>{msg.author}: {msg.content}</p>
        ))}
      </div>
      <form onSubmit={(e) => sendMessage(e)}>
        <textarea
          className="chat__message"
          onChange={(e) => setMessage(e.target.value)}
          onKeyUp={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
          spellCheck="false"
          autoCorrect="false"
          value={message}
        />
        <button type="submit">send</button>
      </form>
    </div>
  );
}
export default Chat;
