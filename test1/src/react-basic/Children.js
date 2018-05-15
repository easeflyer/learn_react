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
  


  function WelcomeDialog() {
    return (
      <FancyBorder color="blue">
        <h1 className="Dialog-title">
          Welcome
        </h1>
        <p className="Dialog-message">
          Thank you for visiting our spacecraft!
        </p>
      </FancyBorder>
    );
  }
  
  ReactDOM.render(
    <WelcomeDialog />,
    document.getElementById('root')
);