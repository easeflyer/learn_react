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
 * 第一种解决方法：见 promise.js
 * 第二种解决方法：
 * 
 * 因为回调函数无法访问 this. 也不允许修改 State
 * 因此可以用 action(‘回调名称’，回调函数) 对回调函数进行包装即可。
 * 
 * 注意这里需要注意回调函数的 this 被 action 重新绑定给了 Store 对象。
 * 
 * 第三种解决方法：runInAction 只把修改 State 的语句放入。
 * 
 */
//import mobx from "mobx";
import React from 'react';
import ReactDOM from 'react-dom';
import { observable, action, computed, runInAction } from "mobx";
import { observer } from "mobx-react";




/**
 * 一个普通的 Promise 函数案例，参考  Promise 相关文档。
 */
function getRemoteData(resolve, reject) {
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
const fetchGithub = () => new Promise(getRemoteData);
const somePreprocessing = (projects) => ['aaa', 'bbb', 'ccc', projects];



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
  async fetchProjects() {
    this.githubProjects = []
    this.state = "pending"
    fetchGithub().then(

      // 用 action() 包裹完整回调解决
      // action('fetchProjectsSuccess',(projects)=>{
      //   const filteredProjects = somePreprocessing(projects)
      //   this.githubProjects = filteredProjects
      //   this.state = "done"
      // }), 
      // action('fetchProjectsError',(error)=>{
      //   this.state = "error"
      // })

      //用 runInAction 解决
      // 它只是 action(f)() 的语法糖
      projects => {
        alert(projects);
        const filteredProjects = somePreprocessing(projects)
        runInAction(() => {
          this.githubProjects = filteredProjects
          this.state = "done"
        });
        return 11;
      },
      error => {
        runInAction(() => {
          this.state = "error"
        });
        return 22;
      }
    ).then((data) => { alert(data) })
  }

  /**
   * 对两个 Actions 回调进行了改造。用 action 包装。
   * 结合 promise.js 一起来看。
   */
  // @action.bound
  // fetchProjectsSuccess(projects) {
  //   const filteredProjects = somePreprocessing(projects)
  //   this.githubProjects = filteredProjects
  //   this.state = "done"
  // }
  // @action.bound
  // fetchProjectsError(error) {
  //   this.state = "error"
  // }
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




/*

异步函数
asyncFun(resolve, reject){
  aaa = 访问网络
  if 成功 resolve(data1)
  if 失败 reject(data2)
}

Promise(asyncFun)
.then(
  (data1)=>{
    alert(data1);
    return data11
  },
  (data2)=>{alert(data2)}
)
.then(
  (data11)=>{
    alert(data11)
  },
  (data22)=>{alert(data2)}
)


注意对 promise 的理解：
1）promise 对象是自动执行的，但不会立即返回结果。
 */