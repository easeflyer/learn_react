import React from "react";
import ReactDOM from "react-dom"
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from "react-router-dom";

////////////////////////////////////////////////////////////
// 1. Click the public page
// 2. Click the protected page
// 3. Log in
// 4. Click the back button, note the URL each time
//根组件
const AuthExample = () => (
    <Router>
        <div>
            {/*未登录和登录欢迎显示组件*/}
            <AuthButton />
            <ul>
                <li>
                    <Link to="/public">Public Page</Link>
                </li>
                <li>
                    <Link to="/protected">Protected Page</Link>
                </li>
            </ul>
            {/*公共组件*/}
            <Route path="/public" component={Public} />
            {/*登录组件*/}
            <Route path="/login" component={Login} />
            {/*私有组件*/}
            <PrivateRoute path="/protected" component={Protected} />
        </div>
    </Router>
);

const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
        this.isAuthenticated = true;
        setTimeout(cb, 100); // fake async
    },
    //登出按钮的点击事件，登出以后，就行计时器函数，设置历史对象为没有登录前
    signout(cb) {
        this.isAuthenticated = false;
        setTimeout(cb, 100);
    }
};
//withRouter可以包装任何自定义组件，将react-router的history,location,match三个对象传入。
const AuthButton = withRouter(
        ({ history }) =>
        //如果登录，返回欢迎和一个登出的按钮，没有登录则返回，，，
        fakeAuth.isAuthenticated ? (
            <p>
                Welcome!{" "}
                {/*注意这里的history.push,它向历史对象加了‘/’，如果登出后点击返回，就会返回到初始页面，而不是登录时界面*/}
                <button
                    onClick={() => {
                        fakeAuth.signout(() => history.push("/"));
                    }}
                >
                Sign out
                </button>
            </p>
        ) : (
                <p>You are not logged in.</p>
            )
);

//私有组件，传入参数，component就是Protected组件
const PrivateRoute = ({ component: Component, ...rest }) => (
    //根据是否登录，选择加载的组件
    <Route {...rest} render={props =>
            fakeAuth.isAuthenticated ? (
                //登录后的组件
                <Component  />
            ) : (
                //重定向组件，没登录的话就重定向到登录界面
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: props.location }
                        }}
                    />
                )
        }
    />
);

const Public = () => <h3>Public</h3>;
const Protected = () => <h3>Protected</h3>;

//提示登录组件，他可以根据是否登录来选择要展示的内容
class Login extends React.Component {
    //登录状态
    state = {
        redirectToReferrer: false
    };
    //登录函数，更新状态
    login = () => {
        fakeAuth.authenticate(() => {
            this.setState({ redirectToReferrer: true });
        });
    };

    render() {
        //location对象,它可以简单的认为是 URL 的对象形式表示，
        //这里要提的是 location.state，这里 state 的含义与 HTML5 history.pushState API 中的 state 对象一样。
        //每个 URL 都会对应一个 state 对象，你可以在对象里存储数据，但这个数据却不会出现在 URL 中。
        //实际上，数据被存在了 sessionStorage 中；
        const { from } = this.props.location.state || { from: { pathname: "/" } };
        const { redirectToReferrer } = this.state;
        //如果已经登录，就重定向到'/',浏览器返回的时候有用
        if (redirectToReferrer) {
            return <Redirect to={from} />;
        }
        //没登录
        return (
            <div>
                <p>You must log in to view the page at {from.pathname}</p>
                <button onClick={this.login}>Log in</button>
            </div>
        );
    }
}
ReactDOM.render(
    <AuthExample />,
    document.getElementById('root')
)   