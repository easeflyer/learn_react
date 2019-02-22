/**
 * 组件的几个模式 ComponentPatterns
 * 参考网址：https://segmentfault.com/a/1190000014537140  参考看代码
 *   - 有状态组件 X 无状态组件
 *   - 容器组件 X 展示组件
 *   - 高阶组件 -- HOCs
 *   - 渲染回调 -- Render Callbacks(Function as Child Components)
 */

import React from 'react';
import ReactDOM from 'react-dom';

/**
 * 无状态组件 x 有状态组件
 *****************************************************************************/

// 一个无状态组件，只通过 props 获得显示样式
const Button = props => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
);

// 自身有状态的组件，复用无状态组件用来组成。
//一个具有计数功能的按钮组件(复用上面Button组件)
class ButtonCounter extends React.Component {
  constructor() {
    super()
    this.state = { clicks: 0 }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState({ clicks: this.state.clicks + 1 })
  }

  render() {
    return (
      <Button
        onClick={this.handleClick}
        text={`You've clicked me ${this.state.clicks} times!`}
      />
    )
  }
}

/**
 * 容器组件 X 展示组件
 *****************************************************************************/

function fetchUsers(cb){
  const users = [
    {name:"zhansan",age:10},
    {name:"zhansan1",age:11},
    {name:"zhansan2",age:12},
    {name:"zhansan3",age:13},
    {name:"zhansan4",age:14},
  ];
  cb(users);
}


// 展示组件
const UserList = props =>
  <ul>
    {props.users.map(u => (
      <li>{u.name} — {u.age} years old</li>
    ))}
  </ul>


//容器组件可以用来更新用户列表的展示:
class UserListContainer extends React.Component {
  constructor() {
    super()
    this.state = { users: [] }
  }

  componentDidMount() {
    fetchUsers(users => this.setState({ users }))
  }

  render() {
    return <UserList users={this.state.users} />
  }
}


/**
 * 高阶组件 -- HOCs
 * 高阶组件--是将组件作为参数并返回新组件的 JS 函数
 ******************************************************************************/

/**
 * 高阶组件
 * 
 * 高阶组件的可以对现有组件方便的扩展 通用的功能。
 * 
 * 
 * @param {*} Clickable 可以点击的组件
 * 也就是必须有 onClick 的 props 参数。
 * 
 * makeToggleable 接收一个组件，返回一个组件
 * 返回的组件为：
 * 接收的组件被点击的时候。切换显示或隐藏这个组件的子元素。
 */
function makeToggleable(Clickable) {
  return class extends React.Component {
    constructor() {
      super()
      this.toggle = this.toggle.bind(this)
      this.state = { show: false }
    }

    toggle() {
      this.setState(prevState => ({ show: !prevState.show }))
    }

    render() {
      return (
        <div>
          <Clickable
            {...this.props}
            onClick={this.toggle}
          />
          {this.state.show && this.props.children}
        </div>
      )
    }
  }
}
/**
 * ToggleableMenu 是 clickable 因为有 props.onClick
 * 它被点击的时候，切换显示或隐藏其子元素
 */
@makeToggleable
class ToggleableMenu extends React.Component {
  render() {
    return (
      <div onClick={this.props.onClick}>
        <h1>{this.props.title}</h1>
      </div>
    )
  }
}

class Menu extends React.Component {
  render() {
    return (
      <div>
        <ToggleableMenu title="First Menu">
          <p>Some content</p>
        </ToggleableMenu>
        <ToggleableMenu title="Second Menu">
          <p>Another content</p>
        </ToggleableMenu>
        <ToggleableMenu title="Third Menu">
          <p>More content</p>
        </ToggleableMenu>
      </div>
    )
  }
}



/**
 * 渲染回调 -- Render Callbacks(Function as Child Components)
 * 将函数作为组件的 props.children
 * 
 ******************************************************************************/


/**
 * 上例中用的是一个 @makeToggleable 的高阶函数 返回新的组件。
 * 这里用的是一个普通的组件 Toggleable
 * 但这个组件的 children 必须是一个 回调函数。{(show,toggle)=>{}}
 * 回调函数接收到 show 状态和 toggle 函数
 */
class Toggleable extends React.Component {
  constructor() {
    super()
    this.toggle = this.toggle.bind(this)
    this.state = { show: false }
  }

  toggle() {
    this.setState(prevState => ({ show: !prevState.show }))
  }

  render() {
    return this.props.children(this.state.show, this.toggle)
  }
}

/**
 * 这仍然是那个 ToggleableMenu
 * 当他被点击的时候。注意 onClick 的触发元素不同了。但效果完全一样。
 *  注意： onClick 的触发元素是一样的。没有不同。ghost
 * <Toggleable> 给子元素（函数）传递了 show 和 onClick
 * 注意 Toggleable 虽然在组件内部进行修饰，但是作用却和外部的装饰器函数一致。
 * 
 * @param {*} props 
 */
const ToggleableMenu1 = props =>
  <Toggleable>
    {(show, onClick) => (
      <div>
        <div onClick={onClick}>
          <h1>{props.title}</h1>
        </div>
        {show && props.children}
      </div>
    )}
  </Toggleable>

class Menu1 extends React.Component {
  render() {
    return (
      <div>
        <ToggleableMenu title="First Menu">
          <p> Render Callbacks  Some content</p>
        </ToggleableMenu>
        <ToggleableMenu title="Second Menu">
          <p> Render Callbacks Another content</p>
        </ToggleableMenu>
        <ToggleableMenu title="Third Menu">
          <p> Render Callbacks  More content</p>
        </ToggleableMenu>
      </div>
    )
  }
}


class App extends React.Component {
  render() {
    return (
      <div>
        <ButtonCounter />
        <UserListContainer />
        <h2>menu</h2>
        <Menu />
        <h2>menu1</h2>
        <Menu1 />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));