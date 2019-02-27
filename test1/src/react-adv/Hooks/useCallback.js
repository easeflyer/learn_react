import React from 'react';
import ReactDOM from 'react-dom';

let fn=null;


function TestUseCallback({ num, name }) {
  const memoizedCallback = React.useCallback(
    () => {
      console.log('abc')
      return num1;
    },
    [num],
  );
  ()=>{}
  console.log('记忆 num > ', Object.is(fn,memoizedCallback), name)
  console.log('原始 num > ', num, name);
  fn = memoizedCallback;
  return (
    <div>
      <p>TestUseCallback</p>
    </div>
  )
}

const num1 = [1, 2, 3];
const num2 = [4, 5, 6];



class App1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num: num1, 
      count: 0,
      name: '123'
    };
  }
  componentDidMount() {
    setInterval(() => {
      this.setState((state) => {
        return {
          count: state.count + 1
        }
      })
    }, 3000);
  }
  handleChangeNum = () => {
    this.setState({
      name: 'def',
      num: num2,
    });
  }
  render() {
    const { num } = this.state;
    
    return (
      <div className="App">
        <h1>Hello</h1>
        <h2>Start editing to see some magic happen!</h2>
        <button onClick={this.handleChangeNum}>修改传入的Num值</button>
        <TestUseCallback num={num} name={this.state.name}/>
      </div>
    );
  }
}



const App = props => <div>
  <App1 />
</div>

ReactDOM.render(<App />, document.getElementById('root'));