export default Play;
function Play() {
  return (
    <div className="game">
      <canvas width="700" height="500" className="game__screen">
        {" "}
      </canvas>
      <div className="game__chat"></div>
    </div>
  );
}
