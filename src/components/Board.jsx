import { useEffect, useRef } from "react";
import { serialize } from "bson";

const Buffer = require("buffer/").Buffer;

const getBoardBlob = async (board) => {
  const blobBoardPromise = new Promise((resolve) => {
    board.toBlob((blob) => resolve(blob), "image/png");
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
  const boardBuff = await boardBlob.arrayBuffer();

  const bsonData = serialize({
    type: "update",
    time: new Date().getTime(),
    boardBlob: Buffer.from(boardBuff),
  });

  send(bsonData);
};

function Board({ send, drawingMode, paintingURL }) {
  const mouseDownRef = useRef(false);
  const boardRef = useRef();
  const ctxRef = useRef();

  useEffect(() => {
    ctxRef.current = boardRef.current?.getContext("2d");
  }, [drawingMode]);

  useEffect(() => {
    if (!paintingURL || !ctxRef.current) {
      return;
    }
    const img = new Image();
    img.src = paintingURL;
    img.onload = () => {
      ctxRef.current?.drawImage(img, 0, 0);
    };
  }, [paintingURL]);

  return (
    <canvas
      width="700"
      height="500"
      className="game__screen"
      onMouseDown={(e) => {
        drawingMode &&
          (() => {
            handleMouseDown(e, ctxRef.current);
            mouseDownRef.current = true;
          })();
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
