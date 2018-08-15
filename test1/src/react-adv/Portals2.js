/**
 * 利用 Portal 把组件渲染到 任何dom节点，脱离组件原本的父子关系，见PortalDemo
 * 只需要对组件：ReactDOM.createPortal(props.children,document.body) 即可。
 */

import React from 'react';
import ReactDOM from 'react-dom';

const styleP = {
    width:'50px',
    height:'50px',
    overflow:'hidden',
    position:'relative',
    backgroundColor:'#336600'

}
const styleC = {
    width:'500px',
    height:'500px',
    position:'absolute',
    left:'0',
    top:'0',
    backgroundColor:'red'
}

const PortalDemo = props => {
    // 按照父子关系进行渲染。children 渲染到 div 里面。成为div的子元素。
    //return (<div style={styleP}>{props.children}</div>);
    // 利用 Portal 把“看起来的子元素” 渲染到 dom 的任何位置，这里渲染到 body
    return (<div style={styleP}>{ReactDOM.createPortal(props.children,document.body)}</div>);
}

const Child = props => {
    return (<div style={styleC}>Child</div>);
}

const App = props => {
    return(
        <PortalDemo>
            <Child />
        </PortalDemo>
    );
}



ReactDOM.render(<App />, document.getElementById('root'));