import React from 'react'
import ReactDOM from 'react-dom'

/**
 * 非受控组件的使用方式，利用 ref 获得 html 元素进行直接操作。
 */

class NameForm extends React.Component {
    constructor(props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleSubmit(event) {
      alert('A name was submitted: ' + this.input.value); // 注意这里 this.input 就是对 <input 支撑对象（html组件）的引用。
      event.preventDefault();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            {/* ref 采用了一个回调函数的方式，回调函数的参数 就是 input 组件的引用 */}
            <input type="text" ref={(input) => this.input = input} />
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