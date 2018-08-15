/**
 * Context 的使用
 * 在祖先范围 使用 <CtxPname.Provider value={this.state.name} > 子元素 </CtxPname.Provider> 提供数据。
 * 然后可以在任何级别子元素中使用 <CtxPname.Consumer> 回调函数 </CtxPname.Consumer> 跨级别获得数据。
 * 
 * 注意除非你明确你的设计必须要用Context 否则请使用 state + props 传递数据。
 */

import React from 'react';
import ReactDOM from 'react-dom';


const style = {
    border: '1px solid #336600',
    padding: '5px',
    margin: '2px'

}

class Parent extends React.Component {
    state = {
        name: '爷爷2'
    }
    // 动态改变 父组件的状态数据
    handleClick = () => {
        this.setState({
            name:this.state.name + '#'
        });
    }
    render() {
        return (
            // 把数据 提供给 context 子孙组件都可以利用 context 获得数据同步
            <CtxPname.Provider value={this.state.name} >
                <div style={style}>
                    Parent:{this.state.name}
                    {this.props.children}
                    <button onClick={this.handleClick}>按钮</button>
                </div>
            </CtxPname.Provider>
        );
    }
}
const Child = props => {
    return (<div style={style}>child:{props.children}</div>);
}
const GrandChild = props => {
    return (
        <CtxPname.Consumer>
            {
                val => (
                    <div style={style}>
                        grandchild<br />
                        parent:{val}
                    </div>
                )
            }
        </CtxPname.Consumer>
    )
}

const CtxPname = React.createContext('爷爷1')


const App = props => {
    return (
        <Parent>
            <Child>
                <GrandChild />
            </Child>
            <Child>
                <GrandChild />
            </Child>
        </Parent>
    );
}


ReactDOM.render(<App />, document.getElementById('root'));