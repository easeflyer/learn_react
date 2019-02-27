import React from 'react'
import ReactDOM from 'react-dom'

class Foo extends Component {
  handleClick() {
    console.log('Click happened');
  }
  render() {
    return <Button onClick={() => this.handleClick()}>Click Me</Button>;
  }
}

class Foo1 extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    console.log('Click happened');
  }
  render() {
    return <Button onClick={this.handleClick}>Click Me</Button>;
  }
}
/*
Assuming <Button> is implemented as a PureComponent, 
the first way will cause <Button> to re-render every time <Foo> re-renders because a new function is created in every render() call. 
In the second way, the handleClick method is only created once in <Foo>'s constructor and reused across renders.
If we translate both approaches to functional components using hooks, these are the equivalents (sort of):
*/
function Foo2() {
  const handleClick = () => {
    console.log('Click happened');
  }
  return <Button onClick={handleClick}>Click Me</Button>;
}
function Foo3() {
  const memoizedHandleClick = useCallback(
    () => console.log('Click happened'), [],
  ); // Tells React to memoize regardless of arguments.
  return <Button onClick={memoizedHandleClick}>Click Me</Button>;
}



const App = props => {
  const [a, setA] = React.useState(0);
  const [b, setB] = React.useState(0);
  return (
    <div>
      <Parent a={a} b={b} />
      <button onClick={() => setA(a + 1)}>改变a</button>
      <button onClick={() => setB(b + 1)}>改变b</button>
    </div>
  )
}
ReactDOM.render(<App />, document.getElementById('root'));