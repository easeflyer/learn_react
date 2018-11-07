/**
 * 编写异步的 Actions（动作）
 * 
 * MobX 中 actions 定义是用来修改 State 的。但在作用于回调函数需要注意：
 * 
 * action 函数/装饰器，只会对包装的函数起作用。对于包装的函数调用的函数不起作用。
 * 也就是说：只能把被包装的函数变为 Actions，可以用来修改 State。其他调用的函数
 * 不是 Action 不能直接修改 State。除非他们也 被显示的定义为 Action。
 * 参考下面的网址，首先看错误的示例。然后结合文章看正确的方法。
 * 参考：https://cn.mobx.js.org/best/actions.html 
 * 
 * 流程解析：
 * 
 * 1）定义 Promise
 * 2）定义 Store 里面保存了 State 和 Actions
 * 3）其中异步 Action 调用 Promise，并执行“成功回调”或者“失败回调”
 * 4）“回调函数” fetchProjectsSuccess 也要定义为 Action 因为要修改 State
 * 
 * 5）定义 UI 组件 GitView。用observer 包装，返回 ObGitView
 * 6）把 Store 实例化，作为 ObGitView 的 props 传入。
 * 7）ObGitView 就具备 Action 修改State 的方法。以及State 数据的变化和衍生变化。
 *    包括异步处理函数对 State 的影响。
 * 
 * 第二种解决方法：见 promise1.js 
 * 
 */
//import mobx from "mobx";
import React from 'react';
import ReactDOM from 'react-dom';
import { observable, action, computed } from "mobx";
import { observer } from "mobx-react";




/**
 * 一个普通的 Promise 函数案例
 */
function p1(resolve, reject) {
  var timeOut = Math.random() * 2;
  console.log('set timeout to: ' + timeOut + ' seconds.');
  setTimeout(function () {
    if (timeOut < 1) {
      console.log('call resolve()...');
      resolve('200 OK');
    } else {
      console.log('call reject()...');
      reject('timeout in ' + timeOut + ' seconds.');
    }
  }, timeOut * 1000);
}
// fetchGithubProjectsSomehow 函数返回一个 Promise 对象。
// somePreprocessing 处理返回数据
const fetchGithubProjectsSomehow = ()=>new Promise(p1);
const somePreprocessing = (projects)=>['aaa','bbb','ccc',projects];



// 强制要求只能用 Actions 修改 State
//mobx.configure({ enforceActions: true })

/**
 * 定义 Store 用于保存 State 和 Actions
 * 知识点：
 * 重点关注 fetchGithubProjectsSomehow Promise 对象的回调函数。也被定义为了 Action
 * 否则无法去修改处理 State 这是 MobX 的要求。也是函数作用域的要求。
 * 原因请看错误的例子：https://cn.mobx.js.org/best/actions.html 
 */
class Store {
  @observable githubProjects = []
  @observable state = "pending" // "pending" / "done" / "error"

  @action.bound
  fetchProjects() {
    this.githubProjects = []
    this.state = "pending"
    fetchGithubProjectsSomehow().then(this.fetchProjectsSuccess, this.fetchProjectsError)

  }

  @action.bound
  fetchProjectsSuccess(projects) {
    const filteredProjects = somePreprocessing(projects)
    this.githubProjects = filteredProjects
    this.state = "done"
  }
  @action.bound
  fetchProjectsError(error) {
    this.state = "error"
  }
}

const GitView = ({pro})=>(
  <div>
    <ul>
    {pro.githubProjects.map((item,key)=><li key={key}>{item}</li>)}
    </ul>
    <button onClick={pro.fetchProjects}>点击</button>
  </div>
);
const ObGitView = observer(GitView);
ReactDOM.render(<ObGitView pro={new Store()} />, document.getElementById('root'));