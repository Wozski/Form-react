import "./App.css";
import { useState } from "react";
import calculateWinner from "./utils";
export default function App() {
  const [board, setBoard] = useState({
    squares: Array(19 * 19).fill(null),
    xIsNext: true,
    currentX: null,
    currentY: null,
  });
  const block = Array(19 * 19).fill(null);
  // board.squares 子的顏色，一開始黑色為 true
  const renderSquare = (i) => {
    return <Square value={board.squares[i]} onClick={() => handleClick(i)} />;
  };
  const handleClick = (i) => {
    const { squares, currentX, currentY } = board;
    //防止重複下棋。
    if (calculateWinner(squares, currentX, currentY) || squares[i]) {
      return;
    }
    // squares[i] = 子的值，例如 B or W
    squares[i] = board.xIsNext ? "B" : "W";
    setBoard({
      squares: squares,
      xIsNext: !board.xIsNext,
      currentX: i % 19,
      currentY: Math.floor(i / 19),
    });
  };
  const Square = (props) => {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value && (
          <div className={props.value === "B" ? "black" : "white"}></div>
        )}
      </button>
    );
  };
  const winner = calculateWinner(board.squares, board.currentX, board.currentY);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player:" + (board.xIsNext ? "B" : "W");
  }
  //item = null, index = number
  return (
    <div className="game-board">
      <div className="status">{status}</div>
      <div className="word">人生如棋，落子無悔</div>
      <div className="board">
        <div className="board_block">
          {block.map((item, index) => (
            <div className="block">{renderSquare(index)}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
