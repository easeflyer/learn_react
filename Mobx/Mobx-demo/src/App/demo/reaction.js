import React from 'react';
import {observable,when,computed, autorun,action,reaction} from 'mobx';

/**
 * 本例 理解：reaction 对什么做出反应。
 * 关键是看 reaction 中使用了什么数据。没有用到的数据发生变化是不会触发 reaction的。
 */


const todos = observable([
  {
      title: "Make coffee",
      done: true,
  },
  {
      title: "Find biscuit",
      done: false
  }
]);

// reaction 的错误用法: 对 length 的变化作出反应, 而不是 title 的变化!
const reaction1 = reaction(
  () => todos.length,
  length => console.log("reaction 1:", todos.map(todo => todo.title).join(", "))
);

// reaction 的正确用法: 对 length 和 title 的变化作出反应
const reaction2 = reaction(
  () => todos.map(todo => todo.title),
  titles => console.log("reaction 2:", titles.join(", "))
);

// autorun 对它函数中使用的任何东西作出反应
const autorun1 = autorun(
  () => console.log("autorun 1:", todos.map(todo => todo.title).join(", "))
);
console.log('push 之前！');


todos.push({ title: "explain reactions", done: false });
// 输出: 三个相应都做除了正确的反应。
// reaction 1: Make coffee, find biscuit, explain reactions
// reaction 2: Make coffee, find biscuit, explain reactions
// autorun 1: Make coffee, find biscuit, explain reactions

todos[0].title = "Make tea"
// 输出:由于 reaction 1 值对 length 做出反应因此这里的修改不会触发它。
// reaction 2: Make tea, find biscuit, explain reactions
// autorun 1: Make tea, find biscuit, explain reactions

export default class App extends React.Component{
  render(){
    return(
      <div>3333</div>
    );
  }
}