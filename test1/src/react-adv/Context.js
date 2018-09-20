import React from 'react';
import ReactDOM from 'react-dom';


//我们在基础教程的最终项目中，数据自顶层向下传递要层层传递，每一级都要定义props
//就像经过一层层的检查站，不仅麻烦，代码的可读性还大大降低
//react提供了一种快速传递数据的通道Context
//适用于全局控制

//我们想传递数据，有三个关键点，数据内容，发布者和订阅者

//创建一个Context数据对象，light为默认值，当没有发布者时，这个值将作为默认数据传递
const ThemeContext = React.createContext('light');

//Provider组件，即发布者组件，作为发布者，要提供数据内容，向对应的组件树分支下传value={....}，
//注意格式，<ThemeContext.Provider value="dark"><Toolbar /></ThemeContext.Provider>
//格式是固定的，<Context.Provider value={..}></Context.Provider>
class App extends React.Component {
    render() {
        return (
            <ThemeContext.Provider value="dark">
                <Toolbar />
            </ThemeContext.Provider>
        );
    }
}
//Consumer,订阅者组件，接受发布者的数据，接收一个函数作为子节点，函数接收当前context的值并返回一个React节点。 
//格式为，{value => /* react渲染组件 */}
//接收格式也是固定的，<Context.Consumer> {value => /*渲染一些东西*/}</Context.Consumer>
function ThemedButton(props) {
    return (
        <ThemeContext.Consumer>
            {theme => <Button {...props} theme={theme} />}
        </ThemeContext.Consumer>
    );
}
function Button(props) {
    this.props.theme  //这里就收到了来自顶层的数据
    return <div></div>
}
// 中间组件
function Toolbar(props) {
    return (
        <div>
            <ThemedButton />
        </div>
    );
}



//看一个实际的例子
//1234层级组件，快速向4层级传递数据

const themes = {
    light: {
        background: '#222222',
    },
    dark: {
        background: '#eeeeee',
    },
};
//第一步创建context对象，最好指定默认值
const BackContext = React.createContext('light'); //一帮情况下，最好在作用域全局声明
class First extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        //顶层组件定义发布者
        return (
            <div>
                <BackContext.Provider value={themes.light.background}>
                    <Second />
                </BackContext.Provider>
                <div />
            </div>
        )
    }
}

class Second extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        //如同广播一样，数据可以有多个接收者，
        return (
            <BackContext.Consumer>
                {theme => (<Third theme={theme} />)}
            </BackContext.Consumer>
        )
    }
}
class Third extends React.Component {
    constructor(props) {
        super(props);
        //第一个接收者，这里可以访问该数据
        console.log('====================================');
        console.log(this.props.theme);
        console.log('====================================');
    }
    render() {
        //在需要该数据的上一层组件或jsx中定义接收者，返回渲染内容，该内容就是接收者（不一定非要返回组件，也在在Four组件中返回jsx元素）
        return (
            <BackContext.Consumer>
                {theme => (<Four theme={theme} />)}
            </BackContext.Consumer>
        )
    }
}
class Four extends React.Component {
    constructor(props) {
        super(props);
    }
    alert() {
        alert("theme is" + this.props.theme)//这里就可以访问该属性啦！！这是第二个接收者
    }
    render() {
        return <button onClick={this.alert.bind(this)} />
    }
}
ReactDOM.render(
    <First />,
    document.getElementById('root')
)

//Context也可以是动态的，你只需要把发布者的value值改变成state即可
//我们知道要更新state，必然有函数触发，Context也可以向下深度传递函数（不改变this作用域），方便更新Context
//要传递函数，直接在value中传入函数即可

//如果我们有多个不同的Context，怎么传递呢？格式如下：
/*
两个Context
const ThemeContext = React.createContext('light');
const UserContext = React.createContext();

发布者格式：
      <ThemeContext.Provider value={theme}>
        <UserContext.Provider value={signedInUser}>
          <Toolbar />
        </UserContext.Provider>
      </ThemeContext.Provider>
接收者格式：
    <ThemeContext.Consumer>
      {theme => (
        <UserContext.Consumer>
          {user => (
            <ProfilePage user={user} theme={theme} />
          )}
        </UserContext.Consumer>
      )}
    </ThemeContext.Consumer>
发布和接收的嵌套顺序要一致！！
*/



