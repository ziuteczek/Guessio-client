import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import createUser from "../api/createUser";
import createGame from "../api/createGame";

export default Join;

function Join() {
  const [nick, setNick] = useState("");
  const [code, setCode] = useState("");

  const { joinType } = useParams();

  const navigate = useNavigate();

  const joinUser = async (e) => {
    e.preventDefault();

    const { userID, status } = await createUser(nick, code);

    if (status !== "succes" || !userID) {
      console.log("creating user failed");
      return;
    }

    localStorage.setItem("user", JSON.stringify({ userID, code }));
    navigate("/play");
  };

  const createAdmin = async (e) => {
    e.preventDefault();

    const { userID, code, status } = await createGame(nick);

    if (status !== "succes" || !userID || !code) {
      console.log("creating user failed");
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
          style={{ textAlign: "center" }}
        />

        <label htmlFor="code">code</label>
        <input
          nick="code"
          maxlength="6"
          id="code"
          disabled={joinType === "create"}
          value={joinType === "create" ? "xxxxxx" : code}
          onChange={(e) => setCode(e.target.value)}
          style={{ textAlign: "center" }}
        />

        <button
          onClick={(e) =>
            joinType === "create" ? createAdmin(e) : joinUser(e)
          }
        >
          Play
        </button>
      </form>
    </div>
  );
}
