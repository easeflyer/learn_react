import React from "react";
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

//定义一个根组件，注意结构
//router包裹所有组件
//a标签替换为Link组件，to属性代替了herf属性，而/about代表了该链接指向的路径
//route组件代表你匹配到的路径所展示的内容，exact表示是严格匹配（建议首页都添加）
//props.path是对应的路径，props.component的值是显示的组件
const BasicExample = () => (
    <Router>
        <div>
            <ul>
                <li>
                    {/*Link组件是点击位置，点击就会跳转到to指定的路径*/}
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/topics">Topics</Link>
                </li>
            </ul>

            <hr />
            {/*Link指定的路径会被映射到这里显示，path是映射的路径，component是要显示的组件*/}
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/topics" component={Topics} />
        </div>
    </Router>
);
//3个即将显示的组件
const Home = () => (
    <div>
        <h2>Home</h2>
    </div>
);

const About = () => (
    <div>
        <h2>About</h2>
    </div>
);
//这个组件含有二级路由，匹配到该组件时，将展现另一个路由系统
//一个 match 对象包含有关 <Route path> 如何匹配 URL 的信息。
/*在 Route component 中，以 this.props.match 方式获取
  在 Route render 中，以 ({ match }) => () 方式获取
  在 Route children 中，以 ({ match }) => () 方式获取
  在 withRouter 中，以 this.props.match 方式获取
*/

const Topics = ({ match }) => (
    <div>
        <h2>Topics</h2>
        <ul>
            <li>
                {/*这里match是父组件的路径，${}代表字符串内的变量*/}
                <Link to={`${match.url}/rendering`}>Rendering with React</Link>
            </li>
            <li>
                <Link to={`${match.url}/components`}>Components</Link>
            </li>
            <li>
                <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
            </li>
        </ul>
        {/*这里动态的渲染组件，:后面是动态路径，可以任意命名，他将会被传递到要显示的组件的props.params中去*/}
        <Route path={`${match.url}/:topiId`} component={Topic} />
        {/*没有点击二级路由，即默认显示的组件*/}
        <Route
            exact
            path={match.url}
            render={() => <h3>Please select a topic.</h3>}
        />
    </div>
);
//二级路由的显示组件
const Topic = ({ match }) => (
    <div>
        <h3>{match.params.topiId}</h3>
    </div>
);
ReactDOM.render(
    <BasicExample />,
    document.getElementById('root')
)