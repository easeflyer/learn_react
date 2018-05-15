import React from 'react'
import ReactDOM from 'react-dom'


function Contacts(){
    return <b>TEL:88888888</b>;
}
function Chat(){
    return <b>QQ:666666</b>
}

function SplitPane(props) {
    return (
      <div className="SplitPane">
        <div className="SplitPane-left">
          {props.left}
        </div>
        <div className="SplitPane-right">
          {props.right}
        </div>
      </div>
    );
  }
  
  function App() {
    return (
      // 组件的属性 传递了一个 组件对象。在组件内部被当做子组件来使用。
      <SplitPane left={<Contacts />} right={<Chat />} />
    );
  }
  
  
  
    
  ReactDOM.render(
    <App />,
    document.getElementById('root')
);