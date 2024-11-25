import { useState } from "react";
import { useNavigate } from "react-router-dom";
import createUser from "../api/createUser";

export default Join;

function Join() {
  const [nick, setNick] = useState("");
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const startBtnHandle = async (e) => {
    e.preventDefault();

    const { userID, status } = await createUser(nick, code);

    if (status !== "succes" || !userID) {
      return;
    }

    localStorage.setItem("user", JSON.stringify({ userID, code }));
    navigate("/play");
  };

  return (
    <div className="join-form__container">
      <form className="join-form" autoComplete="off">
        <label htmlFor="nick">nick</label>
        <input
          type="text"
          maxlength="10"
          id="nick"
          value={nick}
          onChange={(e) => setNick(e.target.value)}
        />

        <label htmlFor="code">code</label>
        <input
          nick="code"
          maxlength="6"
          id="code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <button onClick={(e) => startBtnHandle(e)}>Play</button>
      </form>
    </div>
  );
}
