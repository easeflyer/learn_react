/**
 * 把子元素 渲染到其他 dom 节点。
 * 比如 我们一个程序框架中，有若干 子应用。但是子应用 需要把所有 提示信息，渲染到，程序框架的特定位置。
 * 也就是说 子应用需要渲染自己的子组件到 父组件中的某个 dom 节点中。
 */
import React from 'react';
import ReactDOM from 'react-dom';
import './Portal.css'
 // These two containers are siblings in the DOM
const appRoot = document.getElementById('root');
const modalRoot = document.getElementById('modal-root');

// Let's create a Modal component that is an abstraction around
// the portal API.
// 代码理解：本组件功能就是把 自己的 children 渲染到 motalRoot 节点里。
class Modal extends React.Component {
  constructor(props) {
    super(props);
    // Create a div that we'll render the modal into. Because each
    // Modal component has its own element, we can render multiple
    // modal components into the modal container.
    this.el = document.createElement('div');
  }

  componentDidMount() {
    // Append the element into the DOM on mount. We'll render
    // into the modal container element (see the HTML tab).
    // 这个组件在挂在前 首先把一个 div 挂在到 modalRoot 上面。下载前移除。
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    // Remove the element from the DOM when we unmount
    modalRoot.removeChild(this.el);
  }
  
  render() {
    // Use a portal to render the children into the element
    // 用 portal 把本组件的所有孩子几点，渲染到上面定义的 div 中。
    return ReactDOM.createPortal(
      // Any valid React child: JSX, strings, arrays, etc.
      this.props.children,
      // A DOM element
      this.el,
    );
  }
}

// The Modal component is a normal React component, so we can
// render it wherever we like without needing to know that it's
// implemented with portals.
// 代码理解：
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showModal: false};
    
    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);
  }

  handleShow() {
    this.setState({showModal: true});
  }
  
  handleHide() {
    this.setState({showModal: false});
  }

  render() {
    // Show a Modal on click.
    // (In a real app, don't forget to use ARIA attributes
    // for accessibility!)
    // 给 app 定义一个 motal 组件。用三元运算符，可节约资源。按需调用。需要显示的时候，才会被定义。
    // 当按按钮的时候。motal 组件会被把子元素 提示信息。挂在到 外部的 motal 节点上。跳出了 appRoot 节点。
    // 而本组件会被挂载到 appRoot 节点上。
    const modal = this.state.showModal ? (
      <Modal>
        <div className="modal">
          <div>
            With a portal, we can render content into a different
            part of the DOM, as if it were any other React child.
          </div>
          This is being rendered inside the #modal-container div.
          <button onClick={this.handleHide}>Hide modal</button>
        </div>
      </Modal>
    ) : null;

    return (
      <div className="app">
        This div has overflow: hidden.
        <button onClick={this.handleShow}>Show modal</button>
        {modal}
      </div>
    );
  }
}

ReactDOM.render(<App />, appRoot);
