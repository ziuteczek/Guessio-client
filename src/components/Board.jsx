import { useEffect, useRef } from "react";

const getBoardBlob = async (board) => {
  const blobBoardPromise = new Promise((resolve) => {
    board.toBlob((blob) => resolve(blob), "image/jpeg");
  });
  return await blobBoardPromise;
};

const handleMouseDown = (e, ctx) => {
  const board = e.target;

  const mousePosX = e.clientX - board.offsetLeft;
  const mousePosY = e.clientY - board.offsetTop;

  ctx.beginPath();
  ctx.moveTo(mousePosX, mousePosY);
};

const updateBoard = async (e, send, ctx) => {
  const board = e.target;

  const mousePosX = e.clientX - board.offsetLeft;
  const mousePosY = e.clientY - board.offsetTop;

  ctx.lineTo(mousePosX, mousePosY);
  ctx.stroke();

  const boardBlob = await getBoardBlob(board);

  const boardDataObj = {
    type: "board update",
    time: new Date().getTime(),
    boardBlob: await boardBlob.text(),
  };

  send(JSON.stringify(boardDataObj));
};

function Board({ send }) {
  const mouseDownRef = useRef(false);
  const boardRef = useRef();
  const ctxRef = useRef();

  useEffect(() => {
    ctxRef.current = boardRef.current?.getContext("2d");
  }, []);

  return (
    <canvas
      width="700"
      height="500"
      className="game__screen"
      onMouseDown={(e) => {
        handleMouseDown(e, ctxRef.current);
        mouseDownRef.current = true;
      }}
      onMouseUp={() => (mouseDownRef.current = false)}
      onMouseMove={(e) =>
        mouseDownRef.current && updateBoard(e, send, ctxRef.current)
      }
      ref={boardRef}
    ></canvas>
  );
}
export default Board;
