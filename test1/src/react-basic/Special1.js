import React from 'react'
import ReactDOM from 'react-dom'


function FancyBorder(props) {
    return (
      <div className={'FancyBorder FancyBorder-' + props.color}>
        {/* 
            注意这里 props.children 就是引用的 FancyBorder 组件的所有子组件，可以尝试注释下面的行，看有什么变化
            <FancyBorder> JSX 标签内的任何内容都将通过 children 属性传入 FancyBorder。由于 FancyBorder 
            在一个 <div> 内渲染了 {props.children}，所以被传递的所有元素都会出现在最终输出中。
        */}
        {props.children}
      </div>
    );
  }
  

function Dialog(props) {
    return (
      <FancyBorder color="blue">
        <h1 className="Dialog-title">
          {props.title}
        </h1>
        <p className="Dialog-message">
          {props.message}
        </p>
        {props.children}
      </FancyBorder>
    );
  }
  
  class SignUpDialog extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.handleSignUp = this.handleSignUp.bind(this);
      this.state = {login: ''};
    }
  
    render() {
      return (
        <Dialog title="Mars Exploration Program"
                message="How should we refer to you?">
          <input value={this.state.login}
                 onChange={this.handleChange} />
          <button onClick={this.handleSignUp}>
            Sign Me Up!
          </button>
        </Dialog>
      );
    }
  
    handleChange(e) {
      this.setState({login: e.target.value});
    }
  
    handleSignUp() {
      alert(`Welcome aboard, ${this.state.login}!`);
    }
  }
  
  ReactDOM.render(
    <SignUpDialog />,
    document.getElementById('root')
);