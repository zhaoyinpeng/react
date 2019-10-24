# react学习
1. React 是一个声明式，高效且灵活的用于构建用户界面的 JavaScript 库。使用 React 可以将一些简短、独立的代码片段组合成复杂的 UI 界面，这些代码片段被称作“组件”
2. React 中拥有多种不同类型的组件，我们先从 React.Component 的子类开始介绍
```
//定义继承React.Component的类
class ShoppingList extends React.Component {
  //constructor定义初始化函数
  constructor(props){
    //必须定义super(props) 参照es6 class 继承React.Component的子类定义值时需要
    super(props)
  }
  //render返回所要展示的dom元素
  render() {
    //可以定义数据
    const a = 123
    return (
      <div className="shopping-list">
        //this.props 一般为父元素传过来的数据
        <h1>Shopping List for {this.props.name}</h1>
        <ul>
          <li>Instagram</li>
          <li>WhatsApp</li>
          <li>Oculus</li>
          <li>{a}</li>
        </ul>
      </div>
    );
  }
}
```
3. 组件嵌套，组件渲染到页面
```
//引入相应组件 css
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
class User extends React.Component {
  render() {
    const userName = 'zyp'
    return (
      <div className="game-user">
        {userName}
      </div>
    )
  }
}
//<User /> 和 <Board />都为子组件
class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <User />
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
//将game组件放入#root中
ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
```
4. 父子组件传值和执行方法（暂时不知道父组件怎么触发子组件方法）
```
//子组件
class Square extends React.Component {
  //父组件通过value传值过来
  constructor(props) {
    super(props)
    //子组件定义私有变量 value 可使用this.value定义
    this.state = {
      value: null,
    }
  }
  render() {
    return (
      //onClick触发后触发父组件传过来的onA函数，实现子组件向父组件传递数据和触发事件
      <button className="square" onClick={() => {
        this.props.onA('123')
      }}>
      //this.props为父组件传过来的值
        {this.props.value}
      </button>
    );
  }
}
//父组件
class Board extends React.Component {
  //父组件定义私有变量 squares this.state固定参数必须有
  constructor(props) {
    super(props)
    this.state = {
      squares: Array(9).fill(null),
    };
  }
  renderSquare(i) {
    //父组件通过value传值到子组件value={this.state.squares[i]}
    //onA传递函数，实现绑定到子组件
    return <Square value={this.state.squares[i]} onA={(info) => {
      console.log(info)
      this.handleA(i)
    }} />;
  }
  //可以随意定义函数
  handleA(i) {
    //这里用slice定义了新数组 不可变性！
    const squares = this.state.squares.slice();
    squares[i] = 'x';
    //setState可以重新定义私有变量
    this.setState({ squares: squares })
  }
  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
      </div>
    );
  }
}
```
5. 组件函数(发现变成组件函数后没法传值了)
```
class Square extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: null,
    }
  }
  render() {
    return (
      <button className="square" onClick={() => {
        this.props.onA('123')
      }}>
        {this.props.value}
      </button>
    );
  }
}
//下面的函数等同于上面的class，其导入方法也一样
//变成函数后没法传值了！！！！！
function Square(props) {
  return (
    <button className="square" onClick={props.onA}>
      {props.value}
    </button>
  )
}
```