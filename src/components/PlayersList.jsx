export default PlayersList;

function Player({ nick, points, avatarPath }) {
  return (
    <div className="player">
      <p className="player__name">{nick}</p>
      <p className="player__score">{points} pkt.</p>
      <img className="player__avatar" alt="players avatar" src={avatarPath} />
    </div>
  );
}

function PlayersList({ players = [] }) {
  return (
    <>
      {players.map((player, i) => (
        <Player nick={player.nick} points={player.points} key={i} />
      ))}
    </>
  );
}
