import React from "react";
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

//params是props的一个特殊属性，它是path中指定的动态片段，从URL中解析出的键值对
//你需要在Route组件中定义这个动态片段，用在:后面
//你可以在即将显示的组件的props中得到该值
const ParamsExample = () => (
    <Router>
        <div>
            <h2>Accounts</h2>
            <ul>
                <li>
                    <Link to="/netflix">Netflix</Link>
                </li>
                <li>
                    <Link to="/zillow-group">Zillow Group</Link>
                </li>
                <li>
                    <Link to="/yahoo">Yahoo</Link>
                </li>
                <li>
                    <Link to="/modus-create">Modus Create</Link>
                </li>
            </ul>
            {/*你需要在这里指定动态片段，link组件被点击，id就会改变，他将传入Child*/}
            <Route path="/:id" component={Child} />

            {/*你需要在这里指定动态片段，（|）表示只能匹配的选项，其他的不会匹配，即过滤器，他将传入ComponentWithRegex*/}
            <Route
                asc
                path="/:direction(yahoo|netflix)"
                component={ComponentWithRegex}
            />
        </div>
    </Router>
);

//你再这里。访问props.params属性，可以访问到动态片段
const Child = ({ match }) => (
    <div>
        <h3>ID: {match.params.id}</h3>
    </div>
);

const ComponentWithRegex = ({ match }) => (
    <div>
        <h3>Only yahoo|netflix are allowed: {match.params.direction}</h3>
    </div>
);
ReactDOM.render(
    <ParamsExample />,
    document.getElementById('root')
)