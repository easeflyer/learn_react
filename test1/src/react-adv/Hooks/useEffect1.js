import React from 'react';
import ReactDOM from 'react-dom';
import { useState, useEffect } from 'react';


/*
参考官网。这个例子没有彻底搞明白用途。
能够明确的是
FriendStatus 组件刷新的时候。
useEffect 函数，以及 useEffect 返回的函数在 分别都被执行了一次。
effect函数，也就是传递而给useEffect 的参数，每次渲染都运行，包括 第一次渲染
*/

const ChatAPI = {
    handle:null,
    isOnline:false,
    login:()=>{
        // 做一些登录相关的事情
        // 然后通知订阅的组件
        this.isOnline = true;
        if(this.handle) this.handle({isOnline:true})
    },
    logout:()=>{
        this.isOnline = false;
        if(this.handle)  this.handle({isOnline:false})
    },
    subscribeToFriendStatus:(id,handle)=>{
        console.log(`订阅 用户id:${id},`)
        this.handle = handle;
    },
    unsubscribeFromFriendStatus:(id,handle)=>{
        console.log(`清理 用户id:${id},`)
        this.handle = null;
    },
}



function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    // 注意返回的函数 也被 React 资深获得，并且在组件卸载的时候执行这个函数。
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}

function App(){
    const [show,setShow] = useState(true);
    return(
        <div>
            {show? <FriendStatus friend={{id:1,name:'张三'}} />:null}
            <button onClick={()=>setShow(!show)}>显示/关闭</button>
            <button onClick={ChatAPI.login}>登录</button>
            <button onClick={ChatAPI.logout}>退出</button>
        </div>
    )
}


ReactDOM.render(<App />, document.getElementById('root'));