import { useState } from "react";

/*

1. For the current move only, show “You are at move #…” instead of a button.
2. Add a toggle button that lets you sort the moves in either ascending or descending order.
3. When someone wins, highlight the three squares that caused the win (and when no one wins, display a message about the result being a draw).
4. Display the location for each move in the format (row, col) in the move history list.

*/

function BoardRow() {
  return <div className="board-row"></div>;
}

function Square({ value, onSquareClick, idNo }) {
  idString = "square-" + idNo;
  return (
    <button
      id={idString}
      className="square"
      onClick={onSquareClick}
      style={{ backgroundColor: "WHITE" }}
    >
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (squares[i]) {
      // if the square is not null
      return;
    }
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
    for (let i = 0; i < winner.length; i++) {
      idString = "square-" + winner[i];
      document.getElementById(idString).style.backgroundColor = "GREEN";
    }
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  let numrows = 3;
  let numcols = 3;
  const boardSetup = [];
  for (let i = 0; i < numrows; i++) {
    boardSetup.push(<BoardRow key={`row-${i}`} />);
    for (let j = 0; j < numcols; j++) {
      let idNo = numrows * i + j;
      boardSetup.push(
        <Square
          key={`square-${idNo}`}
          value={squares[idNo]}
          onSquareClick={() => handleClick(idNo)}
          idNo={idNo}
        />
      );
    }
  }

  return <> {boardSetup} </>;
}

function calculateWinner(squares) {
  const lines = [
    // all winning configurations
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return lines[i];
    }
  }

  return null;
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  // [Array(9).fill(null)] is an array with a single item, which itself is an array of 9 nulls.
  const [currentMove, setCurrentMove] = useState(0);
  //const currentSquares = history[history.length - 1];
  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0; // "If the values have the same type, are not numbers, and have the same value, they're considered equal"

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    //setHistory([...history, nextSquares]);
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    const winner = calculateWinner(history[nextMove]);
    if (winner) {
      for (let i = 0; i < winner.length; i++) {
        idString = "square-" + winner[i];
        document.getElementById(idString).style.backgroundColor = "GREEN";
      }
    } else {
      for (let i = 0; i < 9; i++) {
        idString = "square-" + i;
        document.getElementById(idString).style.backgroundColor = "WHITE";
      }
    }
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol> {moves} </ol>
      </div>
    </div>
  );
}
