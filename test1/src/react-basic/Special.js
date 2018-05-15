import React from 'react'
import ReactDOM from 'react-dom'

/**
 * 特殊实例
 * WelcomeDialog  是 Dialog 的特殊实例。
 * 也可以理解为：WelcomeDialog 是对 Dialog 的扩展。但再 react 里面通常用包含（组合）关系，而不用继承扩展
 */


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
      </FancyBorder>
    );
  }
  
  function WelcomeDialog() {
    return (
      <Dialog
        title="Welcome"
        message="Thank you for visiting our spacecraft!" />
    );
  }
  
  ReactDOM.render(
    <WelcomeDialog />,
    document.getElementById('root')
);