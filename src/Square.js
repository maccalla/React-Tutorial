import React, { useState } from "react";
import "./styles.css";

//Squareコンポーネントは制御されたコンポーネント
//関数コンポーネント：renderメソッドだけを有する
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

//全てのマス目の状態をBoardコンポーネント内で保持するようにした
class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

// function Moves(props) {
//   // const gameIsOver = props.gameIsOver;
//   const history = props.history;

//   // const [gameIsOver, history] = useState(0);

//   // const hist = gameIsOver ? history : [{ squares: Array(9).fill(null) }];

//   return (
//     <ol>
//       {history.map((move, step) => (
//         <li key={move}>
//           <button onClick={() => this.jumpTo(move)}>
//             {move ? "Go to move #" + move : "Go to game start"}
//           </button>
//         </li>
//       ))}
//     </ol>
//   );
// }

class Moves extends React.Component {
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  }

  render() {
    const history = this.props.history;

    return (
      <ol>
        {history.map((step, move) => {
          return (
            <li key={move}>
              <button onClick={() => this.jumpTo(step)}>
                {move ? "Go to move #" + move : "Go to game start"}
              </button>
            </li>
          );
        })}
      </ol>
    );
  }
}

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true,
      gameIsOver: false
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    //.slice()を呼んで配列のコピーを作成
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "0";
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext //クリックするたびに先手後手が反転
    });
  }

  render() {
    //現在のゲームの状態（進行中 or 勝敗決定)
    //ゲームの履歴管理
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const gameIsOver = this.state.gameIsOver;

    let status;
    //勝利判定
    if (winner) {
      status = "Winner: " + winner;
      //this.setState({ gameIsOver: true });
    } else {
      status = `Next player: ${this.state.xIsNext ? "X" : "0"}`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <Moves history={history} gameIsOver={gameIsOver} />
        </div>
      </div>
    );
  }
}

//いずれかのプレーヤが勝利したかどうか判定
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
