import React from 'react';
import ReactDOM from 'react-dom';
import { useState, useEffect } from 'react';

/*
useEffect(effect)   告诉 React 在渲染后要做些什么。 类似与：componentDidMount，componentDidUpdate

React（代码内部）将记住传递的函数(我们将把它称为 “effect” )，然后在执行DOM更新后调用它。在这种情况下，
我们设置了文档标题，但我们也可以执行数据获取或调用其他命令式API。
*/



function Example() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
    console.log('click')
  });

  // 我们看到 只要有重新渲染，就会执行所有 useEffect 他并不是订阅了 count 和 mobx 不同
  // 它与 React 类中的 componentDidMount，componentDidUpdate，
  // 和 componentWillUnmount 有相同的功能，但是统一为单个 API
  // 通过增加 第二个参数 count/count 发现，只要不变，就不会执行effect
  useEffect(()=>{
      console.log(333);
  },[count/count])
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
      <button onClick={() => setCount(count)}>不变</button>
    </div>
  );
}

/**
 * 和用 Hooks 同等效果类的例子
 * 注意生命周期方法的使用方法和位置
 */
class Example1 extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        count: 1
      };
    }
  
    componentDidMount() {
      document.title = `You clicked ${this.state.count} times`;
    }
  
    componentDidUpdate() {
      document.title = `You clicked ${this.state.count} times`;
    }
  
    render() {
      return (
        <div>
          <p>You clicked {this.state.count} times</p>
          <button onClick={() => this.setState({ count: this.state.count + 2 })}>
            Click me
          </button>
        </div>
      );
    }
  }


  /**
   * 获取github用户的案例
   */
  function GithubUsers() {
    const [users, setUsers] = useState([]);
  
    useEffect(() => {
      fetch('https://api.github.com/users')
        .then(response => response.json())
        .then(data => {
          setUsers(data);
        });
    }, []);  // 这里是个空数组，因为我们不需要每次更新的时候都做这个操作
  
    return (
      <div className="section">
        {users.map(user => (
          <div key={user.id} className="card">
            <h5>{user.login}</h5>
          </div>
        ))}
      </div>
    );
  }
  



const App = props => <div>
  <Example />
  <hr />
  <Example1 />
  <hr />
  <GithubUsers />
</div>

ReactDOM.render(<App />, document.getElementById('root'));