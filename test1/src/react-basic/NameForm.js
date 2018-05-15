import React from 'react';
import ReactDOM from 'react-dom'

class NameForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};     // 这里初始化了 form 组件的 value 状态值 为 空
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});  // 当 input 发生 change 的时候。修改 value 状态值
    }
  
    handleSubmit(event) {
      alert('A name was submitted: ' + this.state.value);
      event.preventDefault(); // 组织默认动作。
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }
  
  ReactDOM.render(
    <NameForm />,
    document.getElementById('root')
  );
  