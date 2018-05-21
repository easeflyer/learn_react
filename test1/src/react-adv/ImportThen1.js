import React from 'react';
import 'antd-mobile/dist/antd-mobile.css'; // 这一句是从哪里引入的？


export default class App extends React.Component {
    render(){
        return (<h1>被动态加载的组件</h1>);
    }
}