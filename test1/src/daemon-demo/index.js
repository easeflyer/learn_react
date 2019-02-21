/**
 * 这个例子模拟了一个后台进程的效果。
 * game-daemon 就是一个后台进程。
 * App 可以利用 game 提供的方法 senMsg 和他进行通信。
 * game 收到消息后。进行处理。
 * 
 * 这里采用了 定时器进行了异步。模拟了后台进程。
 * 考虑也可以采用协程来实现。
 */


import React from 'react';
import ReactDOM from 'react-dom';
import Game from './game-daemon';


class App extends React.Component{
  constructor(props){
    super(props);
    this.game = null;
    this.init();
  }
  init(){
    this.game = new Game();
  }
  sendMsg = () =>{
    const msg = this.refs.msg.value;
    this.game.sendMsg(msg);
  }

  render(){
    return(
      <div>3333
        <input ref='msg' name='msg' defaultValue="默认消息" />
        <button onClick={this.sendMsg}>发送</button>
      </div>

    );
  }
}


ReactDOM.render(<App />, document.querySelector('#root'));