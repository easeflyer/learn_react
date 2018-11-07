/**
 * MobX 入门案例 2
 * 
 * 知识点：
 * 
 * @observer 和 observer()
 * 作用相同，都是把 无状态的函数组件（纯UI组件）变为响应式组件（有状态）
 * 两种方式：装饰器方式和函数方式，作用一样。
 * 
 * autorun 的使用
 * autorun(函数)，函数的代码依赖“可观察对象”，过程函数，或者是副作用函数，
 * 也就是有外部调用的函数。但“可观察对象”发生变化时，autorun 自动执行。注意：
 * 和computed 唯一不同的是，autorun 执行一个自动过程，并不返回一个新的值。
 * 而 computed 装饰了一个“计算列” 这个计算列变化，会引发 “观察者” observer 组件
 * 的重新渲染。
 * 
 * autorun 的清理：
 * autorun 会返回一个清理函数，执行他就会清理掉 autorun 函数。参考：
 * https://cn.mobx.js.org/refguide/autorun.html
 * 
 * 
 */



import React from "react";
import ReactDOM from 'react-dom'
import { observable, action, computed, autorun, trace } from "mobx";
import { observer } from "mobx-react";
import DevTools from "mobx-react-devtools";


/**
 * State
 * 
 * 这里 TodoList 只是定义了一个数据结构。
 * 利用 @observable 和 @computed 使得数据结构具有了“可观察特性”
 */
class TodoList {
  @observable todos = [];
  @computed get unfinishedTodoCount() {
    trace(true);
    return this.todos.filter(todo => !todo.finished).length;
  }
  constructor() {
    autorun(() => console.log(this.unfinishedTodoCount));
  }
}


/**
 * Observer
 * 
 * 也就是“观察者” React 视图组件。
 * 当 State 发生变化，观察者随之变化。
 */
@observer
class TodoListView extends React.Component {
  render() {
    return <div>
      <ul>
        {this.props.todoList.todos.map(todo =>
          <TodoView todo={todo} key={todo.id} />
        )}
      </ul>
      Tasks left: {this.props.todoList.unfinishedTodoCount}
      <DevTools />
      <button onClick={
        () => this.props.todoList.todos.push({ id: 3, finished: false, title: '标题3' })
      }>添加</button>
    </div>
  }
}
// 这里因为 TodoView 是上面的 observer 组件的子组件，因此可以不用 observer()
const TodoView = observer(({ todo }) =>
  <li>
    <input
      type="checkbox"
      checked={todo.finished}
      onClick={() => todo.finished = !todo.finished}
    />{todo.title}
  </li>
)


/**
 * 触发变化
 * 
 * 这里没有用 action 触发变化。而是直接对 State 做了修改。
 * 因为 State 是被观察的。因此 React 视图随之触发渲染。
 */
const store = new TodoList();
store.todos.push({ id: 1, finished: false, title: '标题1' });
store.todos.push({ id: 2, finished: false, title: '标题2' });
ReactDOM.render(<TodoListView todoList={store} />, document.getElementById('root'));