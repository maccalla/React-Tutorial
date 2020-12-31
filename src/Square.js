import React from "react";
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
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true //先手後手○X
    };
  }

  handleClick(i) {
    //.slice()を呼んで配列のコピーを作成
    const squares = this.state.squares.slice();
    squares[i] = this.state.xIsNext ? "X" : "0";
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext //クリックするたびに先手後手が反転
    });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    //現在のゲームの状態（進行中 or 勝敗決定)
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = `Next player: ${this.state.xIsNext ? "X" : "0"}`;
    }

    return (
      <div>
        <div className="status">{status}</div>
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

export default class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}
