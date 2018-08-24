import React from 'react';
import { Redirect } from 'react-router-dom';


/**
 * 
 */
class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      redirectToReferrer: false
    }
    this.login = this.login.bind(this);
  }

  /**
   * 登录模拟
   * 登录，然后2秒后执行回调 setState 本页面被重新渲染。
   * 判断 redirectToReferrer 渲染 from 也就是返回之前的页面。 
   * 
   * props.location : {pathname: "/category/shoes", search: "", hash: "", state: undefined, key: "9rrh7p"}
   *    通常用 state 来保存，从哪里来到的 当前路径。
   * this.props.location.state
   *    是 /Admin 路由 把自己的 props.location 传递传递过来的
   */
  login() {
    fakeAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true })
    })
  }

  render() {
    console.log('location.state:',this.props.location.state)
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return (
        <Redirect to={from} />
      )
    }

    return (
      <div>
        <p>You must log in to view the page at {from.pathname}</p>
        <button onClick={this.login}>Log in</button>
      </div>
    )
  }


}

/* A fake authentication function */

export const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 2000);
  }
};


export default Login