/**
 * 编写异步的 Actions（动作）
 * 
 * 第四中方法：采用 async/await 的方法
 */
//import mobx from "mobx";
import React from 'react';
import ReactDOM from 'react-dom';
import { observable, action, computed, runInAction } from "mobx";
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
      resolve('200 OK！！');
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
 * async/await 的使用。
 * await 暂停等待一个异步处理返回结果。必须写在 async 函数里。
 * 
 * await fun() 暂停等待异步函数的结果。返回结果后，继续执行下面的语句。
 * 因此下面的语句就类似回调函数。避免了回调地狱。
 */
class Store {
  @observable githubProjects = []
  @observable state = "pending" // "pending" / "done" / "error"

  @action.bound
  async fetchProjects() {
    this.githubProjects = [];
    this.state = "pending";
    try {
      const projects = await fetchGithubProjectsSomehow();
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
  }
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