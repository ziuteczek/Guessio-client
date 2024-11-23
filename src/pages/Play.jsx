import {  useState } from "react";

export default Play;
function Player({ nick, points, avatarPath }) {
  return (
    <div className="player">
      <p className="player__name">{nick}</p>
      <p className="player__score">{points} pkt.</p>
      <img className="player__avatar" alt="" src={avatarPath} />
    </div>
  );
}
function Play() {
  const { boardState, setBoardState } = useState({});


  return (
    <div className="game">
      <div className="game__players">
        <Player nick="Stasio" points="3214" avatarPath="" />
      </div>
      <canvas width="700" height="500" className="game__screen">
        {" "}
      </canvas>
      <div className="game__chat"></div>
    </div>
  );
}
