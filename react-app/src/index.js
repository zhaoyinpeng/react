import React from 'react';
import ReactDOM from 'react-dom';
import User from './User.js';
import './index.css';

// class Square extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       value: null,
//     }
//   }
//   render() {
//     return (
//       <button className="square" onClick={() => {
//         this.props.onA('123')
//       }}>
//         {this.props.value}
//       </button>
//     );
//   }
// }
//变成函数后没法传值了！！！！！
function Square(props) {
  let winnerLineClass = props.winnerLine ? 'winnerLine' : ''
  return (
    <button className={"square " + winnerLineClass} onClick={props.onA}>
      {props.value}
    </button>
  )
}
class Board extends React.Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     squares: Array(9).fill(null),
  //     xIsNext: true,
  //   };
  // }
  renderSquare(i) {
    return (<Square winnerLine={this.props.winnerLine.indexOf(i) >= 0} key={i} value={this.props.squares[i]} onA={(info) => {
      console.log(info)
      this.props.onClick(i)
    }} />);
  }
  // handleA(i) {
  //   const squares = this.state.squares.slice();
  //   if (calculateWinner(squares) || squares[i]) {
  //     return;
  //   }
  //   squares[i] = this.state.xIsNext ? 'X' : 'O';
  //   this.setState({
  //     squares: squares,
  //     xIsNext: !this.state.xIsNext
  //   })
  // }
  render() {
    // const winner = calculateWinner(this.state.squares);
    // let status;
    // if (winner) {
    //   status = 'Winner: ' + winner;
    // } else {
    //   status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    // }

    // return (
    //   <div>
    //     {/* <div className="status">{status}</div> */}
    //     <div className="board-row">
    //       {this.renderSquare(0)}
    //       {this.renderSquare(1)}
    //       {this.renderSquare(2)}
    //     </div>
    //     <div className="board-row">
    //       {this.renderSquare(3)}
    //       {this.renderSquare(4)}
    //       {this.renderSquare(5)}
    //     </div>
    //     <div className="board-row">
    //       {this.renderSquare(6)}
    //       {this.renderSquare(7)}
    //       {this.renderSquare(8)}
    //     </div>
    //   </div>
    // );
    // for循环出来
    let list = [0, 1, 2]
    return (
      <div>
        {
          list.map((item1, index1) => {
            return (
              <div key={index1} className="board-row">
                {
                  list.map((item2, index2) => {
                    let num = index1 + index2 * 3
                    return (
                      this.renderSquare(num)
                    )
                  })
                }
              </div>
            )
          })
        }
      </div >
    )
  }
}
// class User extends React.Component {
//   render() {
//     const userName = 'zyp'
//     return (
//       <div className="game-user">
//         {userName}
//       </div>
//     )
//   }
// }
class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        index: 0,
        position: null
      }],
      winnerLine: '',
      stepNumber: 0,
      xIsNext: true,
      active: null,
      isReverse: false
    }
  }
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
        index: history.length,
        position: i
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      active: history.length
    })
    const winner = calculateWinner(squares)
    if (winner) {
      this.setState({
        winnerLine: winner.winnerLine.join('')
      })
    } else if (this.state.winnerLine) {
      this.setState({
        winnerLine: ''
      })
    }
  }
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
      active: step
    })
  }
  onReverseInfo() {
    this.setState({
      isReverse: !this.state.isReverse
    })
  }
  render() {
    let history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    //我们可以通过使用 map 方法，把历史步骤映射为代表按钮的 React 元素，然后可以展示出一个按钮的列表，点击这些按钮，可以“跳转”到对应的历史步骤。
    if (this.state.isReverse) {
      history = [...history].reverse()
    }
    const moves = history.map((step, move) => {
      const position = calculatePosition(step.position)
      const dexc = position ? 'Go to move #' + step.index + '坐标x:' + position.x + '坐标y:' + position.y : 'Go to game start';
      const activeClass = step.index === this.state.active ? 'actived' : '';
      return (
        <li key={step.index}>
          <button className={activeClass} onClick={() => this.jumpTo(step.index)}>{dexc}</button>
        </li>
      )
    })

    let status;
    if (winner) {
      status = 'Winner: ' + winner.squares;
    } else if (this.state.stepNumber >= 9) {
      status = '平局';
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    return (
      <div className="game">
        <User />
        <div className="game-board">
          <Board winnerLine={this.state.winnerLine} squares={current.squares} onClick={(i) => {
            this.handleClick(i)
          }} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button onClick={() => this.onReverseInfo()}>记录顺序改变</button>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
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
      return {
        squares: squares[a],
        winnerLine: lines[i]
      }
    }
  }
  return null;
}
function calculatePosition(i) {
  if (!i && i !== 0) {
    return null
  }
  return {
    x: i % 3 + 1,
    y: parseInt(i / 3) + 1
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
