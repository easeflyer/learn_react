import React from 'react';
import ReactDOM from 'react-dom';

function PhotoStory(){
    return <h2>我是 PhotoStory 组件</h2>
}
function VideoStory(){
    return <h2>我是 VideoStory 组件</h2>
}

const components = {
  photo: PhotoStory,
  video: VideoStory
};

// 这是一个错误的例子
// function Story(props) {
//   // 错误！JSX 类型不能是表达式
//   return <components[props.storyType] story={props.story} />;
// }

function Story(props) {
    // 正确！JSX 类型可以是一个以大写字母开头的变量.
    const SpecificStory = components[props.storyType];
    // 直接返回 components[props.storyType];是不行的 因为他只是一个变量，而不是 jsx 的组件，下面的语法进行了转换。
    return <SpecificStory story={props.story} />;  
}

let Story2 = components['photo']

let Story1 = (props)=>components[props] //这个 Story1 只是一个普通函数，而不是组件

let Story3 = (props)=><h2>我是 {props.storyType}</h2>

console.log(`story2:${Story2}  story1:${Story1}  story3:${Story3}`)

ReactDOM.render(<Story storyType="video" />,document.getElementById('root'))