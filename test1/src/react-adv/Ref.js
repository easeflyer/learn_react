
import React from 'react';
import ReactDOM from 'react-dom';



class CustomTextInput extends React.Component {
    // constructor(){
    //     super();
    //     this.name = <input name="name" />;
    // }
    focus() {
        this.refs.myInput.focus();
    }
    render() {
        // 通过 给ref赋值，然后上面用 refs.myInput 对dom进行引用。
        return <input name="name" ref="myInput" />
    }
}

// 父组件 AutoFocusTextInput 操作子组件的 dom 对象。
// his.textInput 就是 子组件 CustomTextInput
// CustomTextInput.focus() 又调用了 子组件的 input html 元素，另一个更好的方法见下面的案例。
class AutoFocusTextInput extends React.Component {
    componentDidMount() {
        this.textInput.focus();
        //this.textInput.value = 'typeing...';
    }

    render() {
        return (
            <CustomTextInput
                // 通过回调函数的方式 获得 对组件的 dom 引用。
                // 这里渲染的时候就会执行回调。ref 属性接受回调函数，并且当组件 装载(mounted) 或者 卸载(unmounted) 之后，回调函数会立即执行
                // 需要注意的是，这种方法仅对以类(class)声明的 CustomTextInput 有效 函数式组件无效。因为没有实例，没有this
                ref={(input) => { this.textInput = input; }} />
        );
    }
}



// 用 defaultValue="Bob" 给 input 设定默认值
class NameForm extends React.Component {
    constructor(props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleSubmit(event) {
      alert('A name was submitted: ' + this.input.value);
      event.preventDefault();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input defaultValue="Bob" type="text" ref={(input) => this.input = input} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }
  
  
  


/**
 * 对于 ref 回调的详细理解。注意引用关系。
 * findDOMNode() 也是一个引用 dom 组件的方法。
 */

function CustomTextInput1(props) {
    return (
        <div>
            {/* 这里 props.inputRef 已经在父组件被赋值了。this 指向父组件。然而 el 则代表的是 本input 
                注意 inputRef 只是一个普通的属性，用于传递 回调函数。的引用。
            */}
            <input ref={props.inputRef} />
            <NameForm />
        </div>
    );
}

class Parent extends React.Component {
    render() {
        return (
            <CustomTextInput1
                // inputRef 是个普通的属性，但是这里指向了 CustomTextInput1 的 ref 回调。注意这里的 this 指的是 Parent 而el 是一个参数。
                // el 将被 ref 回调 并指向调用的 dom 组件。
                inputRef={el => this.inputElement = el}
            />
        );
    }
    componentDidMount(){
        //this.inputElement.value = "ease";
    }
}





ReactDOM.render(<Parent />, document.getElementById('root'));