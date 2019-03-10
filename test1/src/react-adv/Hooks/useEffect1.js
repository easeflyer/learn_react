import React from 'react';
import ReactDOM from 'react-dom';
import { useState, useEffect } from 'react';

/**
 * 知识点：
 *   - useEffect 什么时候清理
 *   - 通过 useEffect 第二个参数，限制执行。
 *   - 计数器刷新，组件刷新了，但并未重新订阅。
 *   - 组件卸载。执行清理。
 *   - Effect 再次执行前，先执行清理。
 */




// 官方的 ChatAPI 并没有完整案例。
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


/**
 * 使用  useEffect 的函数组件
 * 注意 在线状态订阅和取消的 执行时间。
 * @param {*} props 
 */
function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    // 注意返回的函数 也被 React 自身获得，并且在组件卸载的时候执行这个函数。
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  },[props.friend.id]); // 仅当 id 改变时，才会重新订阅。

  if (isOnline === null) {
    return 'Loading...';
  }
  return <div>
    {console.log("FriendStatus 刷新")}
    {isOnline ? 'Online' : 'Offline'}
  </div>;
}



function App(){
    const [show,setShow] = useState(true);
    const [count,setCount] = useState(0);
    const [userId,setUserId] = useState(1);
    return(
        <div>
            userId:{userId}<br />
            计数器：{count}<button onClick={()=>setCount(count+1)}>改变计数器</button><br />
            {show? <FriendStatus friend={{id:userId,name:'张三'}} />:null}
            <button onClick={()=>setShow(!show)}>显示/关闭</button>
            <button onClick={()=>setUserId(userId+1)}>userid+1</button>
            
            <button onClick={ChatAPI.login}>登录</button>
            <button onClick={ChatAPI.logout}>退出</button>
        </div>
    )
}


ReactDOM.render(<App />, document.getElementById('root'));