import React from 'react';
import ReactDOM from 'react-dom';

/**
 * 代码分析
 * 
 * 1）ref={(input) => { this.textInput = input; }} 使得当前组件 获得了对 原生input 的引用。
 * 2）onClick={this.focus} 执行组件的 focus() 方法，此方法 调用原生 input 的 focus() 方法。
 */


class CustomTextInput extends React.Component {
    constructor(props) {
      super(props);
      this.focus = this.focus.bind(this);
    }
  
    focus() {
      // 通过使用原生API，显式地聚焦text输入框
      this.textInput.focus();
    }
  
    render() {
      // 在实例中通过使用`ref`回调函数来存储text输入框的DOM元素引用(例如:this.textInput)
      return (
        <div>
          <input
            type="text"
            ref={(input) => { this.textInput = input; }} />
          <input
            type="button"
            value="Focus the text input"
            onClick={this.focus}
          />
        </div>
      );
    }
}
  
ReactDOM.render(<CustomTextInput />, document.getElementById('root'));  