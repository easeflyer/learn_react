import React from 'react';
import ReactDOM from 'react-dom';
import Loadable from 'react-loadable';
import {Toast} from 'antd-mobile'
/**
 * 本页面定义若干 模块/页面。
 * 
 */



// 定义加载时 如何显示。可以考虑动画。
const Loading = () => { return <div>Loading...</div> };
function loadingToast() {
    Toast.loading('Loading...', 1, null);
    return <div>载入完毕</div>
}

export const Site = Loadable({
    loader: () => import('./Site/Index'),
    loading: loadingToast
});
export const App2 = Loadable({
    loader: () => import('./App2/Index'),
    loading: loadingToast,
});

// const App = {
//     'App1':App1,
//     'App2':App2
// }
