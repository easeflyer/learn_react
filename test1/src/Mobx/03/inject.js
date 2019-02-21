/**
 * 参考：https://cn.mobx.js.org/refguide/api.html
 * inject (mobx-react 包)
相当于Provider 的高阶组件。可以用来从 React 的context中挑选 store 作为 prop 传递给目标组件。用法:

inject("store1", "store2")(observer(MyComponent))
@inject("store1", "store2") @observer MyComponent
@inject((stores, props, context) => props) @observer MyComponent
@observer(["store1", "store2"]) MyComponent is a shorthand for the the @inject() @observer combo.

例子：

@inject('authStore')   将会从 provider 里 rootStore 把 authStore 这个子 Store 传递给
                       下面的 Login Compnent
@withRouter           也就是：withRouter(({history,location,match})=>{ 
                      把三个 Router 属性对象传入被装饰的组件。
@observer             MobX提供的 装饰负责监听跟随 observable 的变化的组件。
export default class Login extends React.Component 

Login 组件将会获得若干 props 由以上装饰器提供。

参考代码：https://github.com/gothinkster/react-mobx-realworld-example-app
*/