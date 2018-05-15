import React from 'react';
import ReactDOM from 'react-dom';

class Clock extends React.Component {
    constructor(props) {
      super(props);
      this.state = {date: new Date()};
    }
  
    componentDidMount() {
      this.timerID = setInterval(
        () => this.tick(),
        1000
      );
    }
  
    componentWillUnmount() {
      clearInterval(this.timerID);
    }
  
    tick() {
      this.setState({
        date: new Date()
      });
    }
  
    render() {
      return (
        <div>
          <h1>Hello, world!</h1>
          <h2>It is {this.props.id}:{this.state.date.toLocaleTimeString()}.</h2>
        </div>
      );
    }
  }
  
class App extends React.Component{
    render(){
        return (
            <div>
                <Clock id='1' />
                <Clock id='2' />
                <Clock id='3' />
            </div>
        );
    }
}


  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
  
  