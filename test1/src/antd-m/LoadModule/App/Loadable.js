import React from 'react';
import ReactDOM from 'react-dom';
import Loadable from 'react-loadable';
/**
 * 本页面定义若干 模块/页面。
 * 
 */



// 定义加载时 如何显示。可以考虑动画。
const Loading = () => { return <div>Loading...</div> };

export const Site = Loadable({
    loader:()=>import('./Site/Index'), 
    loading:Loading });
export const App2 = Loadable({ 
    loader:()=>import('./App2/Home'),
    loading:Loading,});

// const App = {
//     'App1':App1,
//     'App2':App2
// }
