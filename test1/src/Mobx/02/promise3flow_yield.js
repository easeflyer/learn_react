/**
 * 编写异步的 Actions（动作）
 * 
 * 第四中方法：采用 async/await 的方法
 */
//import mobx from "mobx";
import React from 'react';
import ReactDOM from 'react-dom';
import { observable, action, flow, runInAction } from "mobx";
import { observer } from "mobx-react";




/**
 * 一个普通的 Promise 函数案例，参考  Promise 相关文档。
 */
function p1(resolve, reject) {
  var timeOut = Math.random() * 2;
  console.log('set timeout to: ' + timeOut + ' seconds.');
  setTimeout(function () {
    if (timeOut < 1) {
      console.log('call resolve()...');
      resolve('200 OK！！flow yield');
    } else {
      console.log('call reject()...');
      reject('timeout in ' + timeOut + ' seconds.');
    }
  }, timeOut * 1000);
}
// fetchGithubProjectsSomehow 函数返回一个 Promise 对象。
// somePreprocessing 处理返回数据
const fetchGithubProjectsSomehow = () => new Promise(p1);
const somePreprocessing = (projects) => ['aaa', 'bbb', 'ccc', projects];



// 强制要求只能用 Actions 修改 State
//mobx.configure({ enforceActions: true })

/**
 * 定义 Store 用于保存 State 和 Actions
 * 知识点：
 * 生成器函数 + yield 的方法
 * 和使用 async/await 类似。只是吧 async 换成了 * 生成器函数，把await换成了yield
 * 生成器函数，本身就是惰性的。？？ 不阻断吗？
 * yield 函数，正好能中断等待结果。然后继续执行下面的语句。
 * 参考：https://cn.mobx.js.org/best/actions.html
 */
class Store {
  @observable githubProjects = []
  @observable state = "pending" // "pending" / "done" / "error"

  @action.bound
  fetchProjects = flow(function * () {
    this.githubProjects = [];
    this.state = "pending";
    try {
      const projects = yield fetchGithubProjectsSomehow();
      const filteredProjects = somePreprocessing(projects)
      runInAction(() => {
        this.githubProjects = filteredProjects
        this.state = "done"
      });
    } catch (error) {
      runInAction(() => {
        this.state = "error"
      });
    }
  });
}

const GitView = ({ pro }) => (
  <div>
    <ul>
      {pro.githubProjects.map((item, key) => <li key={key}>{item}</li>)}
    </ul>
    <button onClick={pro.fetchProjects}>点击</button>
  </div>
);
const ObGitView = observer(GitView);
ReactDOM.render(<ObGitView pro={new Store()} />, document.getElementById('root'));