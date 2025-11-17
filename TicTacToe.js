import { useState } from "react";

/*

1. For the current move only, show “You are at move #…” instead of a button.
2. Rewrite Board to use two loops to make the squares instead of hardcoding them.
3. Add a toggle button that lets you sort the moves in either ascending or descending order.
4. When no one wins, display a message about the result being a draw.
5. Display the location for each move in the format (row, col) in the move history list.

*/

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

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square
          value={squares[0]}
          onSquareClick={() => handleClick(0)}
          idNo={0}
        />
        <Square
          value={squares[1]}
          onSquareClick={() => handleClick(1)}
          idNo={1}
        />
        <Square
          value={squares[2]}
          onSquareClick={() => handleClick(2)}
          idNo={2}
        />
      </div>
      <div className="board-row">
        <Square
          value={squares[3]}
          onSquareClick={() => handleClick(3)}
          idNo={3}
        />
        <Square
          value={squares[4]}
          onSquareClick={() => handleClick(4)}
          idNo={4}
        />
        <Square
          value={squares[5]}
          onSquareClick={() => handleClick(5)}
          idNo={5}
        />
      </div>
      <div className="board-row">
        <Square
          value={squares[6]}
          onSquareClick={() => handleClick(6)}
          idNo={6}
        />
        <Square
          value={squares[7]}
          onSquareClick={() => handleClick(7)}
          idNo={7}
        />
        <Square
          value={squares[8]}
          onSquareClick={() => handleClick(8)}
          idNo={8}
        />
      </div>
    </>
  );
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
