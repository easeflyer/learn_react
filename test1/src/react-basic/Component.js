import React from 'react';
import ReactDOM from 'react-dom';
import './c.css' // 引入 css 注意路径的对应关系，是从当前文件开始的。
/**
 * 组件定义的原则是：复用，因此尽可能拆分组件，而不要把功能写到一个复杂的组件中
 */



/**
 * 注意这里 小写字母开头是个普通的函数，不是组件。
 */
function formatDate(date) {
    return date.toLocaleDateString();
}

// 头像 Avatar 组件
function Avatar(props) {
    return (
        <img className="Avatar"
            src={props.user.avatarUrl}     // 组件的 user 属性是一个对象，包含2个属性
            alt={props.user.name} />
    );
}
// 用户信息  组件
function UserInfo(props) {                 // 这里也用到了 user 属性。并且把user 属性 直接复制给了子组件 Avatar
    return (
        <div className="UserInfo">
            <Avatar user={props.user} />    
            <div className="UserInfo-name">
                {props.user.name}
            </div>
        </div>
    );
}
// 评论组件 父组件
// author 属性 复制给 UserInfo 组件的 user 属性，（是个对象，和上面是同一个对象。）
function Comment(props) {                       
    return (
        <div className="Comment">
            <UserInfo user={props.author} />
            <div className="Comment-text">
                {props.text}
            </div>
            <div className="Comment-date">
                {formatDate(props.date)}
            </div>
        </div>
    );
}


// 这里 comment 只是一个对象，用于提供数据
const comment = {
    date: new Date(),
    text: 'I hope you enjoy learning React!',
    author: {
        name: 'Hello Kitty',
        avatarUrl: 'http://placekitten.com/g/64/64'
    }
};
// 整个 父子关系 虽然比较绕，但是结构还是比较简单清晰的。
ReactDOM.render(
    <Comment
        date={comment.date}
        text={comment.text}
        author={comment.author} />,
    document.getElementById('root')
);