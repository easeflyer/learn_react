import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './index.less'; // 如果设置了内部的 字体更换，这里可以不用设置。

import registerServiceWorker from './registerServiceWorker';
//import App from './App';
//初级部分
import './react-basic/reactbasic.js'       // react基础知识
//import './react-basic/Componentbasic.js'   // 定义组件的方法
//import './react-basic/Component';          // 组件抽离与props
//import './react-basic/state.js'            // 组件的生命周期函数与状态,时钟例子
//import './react-basic/asyncstate.js'       // 状态的异步更新
//import './react-basic/Toggle'              // 切换按钮-事件机制
//import './react-basic/LoginControl'        // 登录控制，条件渲染
//import './react-basic/Bool'                // 用 布尔运算 进行条件渲染
//import './react-basic/AvoidRender'         // 阻止渲染
//import './react-basic/List.js'             // 列表的使用方法
//import './react-basic/KeyError.js'         // 如何给 列表 使用 key
//import './react-basic/KeyRight.js'         // 正确的使用 key
//import './react-basic/NameForm'            // 受控组件-表单
//import './react-basic/TextArea'            // 受控组件 TextArea
//import './react-basic/Select'              // 受控组件 Select 的使用
//import './react-basic/MultiInput'          // 多个input 通过判断来进行操作
//import './react-basic/StateUp'             // 状态提升
//import './react-basic/StateUp1'            // 状态提升，数据共享，主要案例
//import './react-basic/Children'            // props.children 用来包含引用子元素
//import './react-basic/ChildrenCustom'      // 自定义子组件，通过 props 传递子组件对象。
//import './react-basic/Special'             // 特殊实例：组合 而不是 继承
//import './react-basic/Special1'            // 继承几乎用不到。如果有些功能和ui无关，可以写到单独的 js 文件中。
//import './react-basic/ProductTable'        // 静态项目案例，参考官网 http://react.yubolun.com/docs/thinking-in-react.html
//import './react-basic/ProductTable1'       // 完整代码，添加了交互部分

// 以下为 高级部分 代码
//import './react-adv/Jsx'                   // jSX 详解
//import './react-adv/RuntimeComponnet'      // 运行时组件选择，运行时动态选择组件进行渲染
//import './react-adv/PropTypes'             // 类型检查实例
//import './react-adv/PropTypes1'            // 完整的PropTypes检查类型
//import './react-adv/Ref'                   // Ref 基本应用与非受控组件。
//import './react-adv/Ref1'                   // Ref 基本应用。
//import './react-adv/Context'               // 跨级快速传递props--Context
//import './react-adv/Fragments'             // Fragmens片段
//import './react-adv/Portals'               // 插槽：把组件挂在到外部dom节点上，跳出父元素
//import './react-adv/Portals1'              // 插槽：捕获外部dom触发的事件冒泡
//import './react-adv/Portals2'                 // 参考 sifou 一步 教程：组件通信
//import './react-adv/Context1'                // react 16.3 开始对 Context 进行了官方的正式版本支持。 比redux 更加轻量级，实现跨等级的数据通讯。
//import './react-adv/Advance'               // 高阶组件
//import './react-adv/ImportThen'            // 使用的是 importThen 方法。
//import './antd-m/LoadModule/App'           // 这是一个程序框架，测试动态加载。
//import './react-adv/ReactRouter/Router1'   // 测试路由功能。
//import './react-adv/Loadable/App'          // 动态加载测试，根据不同的条件，加载模块。可以考虑不用路由的功能。 直接用文件夹组织模块即可。

//react-router路由
//import './react-adv/ReactRouter/routerBegin'  //路由映射及路由嵌套
//import './react-adv/ReactRouter/params'       //动态片段params
//import './react-adv/ReactRouter/private'      //重定向，历史对象history，location对象
//import './react-adv/ReactRouter/match'        //children,无条件渲染
//import './react-adv/ReactRouter/prompt'       //路由切换时确认
//import './react-adv/ReactRouter/config'       //路由配置
//import './react-adv/ReactRouter/sidebar'      //侧边栏--多位置映射路由
//import './react-adv/ReactRouter/Router' 

// 高阶组件 高阶函数 非常重要 参考 react-adv/HigherOrderComponect 以及官方案例
//import './react-adv/context/context-redux/index' // 基于 react-router 和 context 的 react 极简框架。（参考：context/demo1/app.js）

/**
 * 组件的几个模式 ComponentPatterns
 * 参考网址：https://segmentfault.com/a/1190000014537140
 *   - 有状态组件 X 无状态组件
 *   - 容器组件 X 展示组件
 *   - 高阶组件 -- HOCs
 *   - 渲染回调 -- Render Callbacks(Function as Child Components)
 */
//import './react-adv/ComponentPatterns/App'

// Hooks
//import './react-adv/Hooks/App'
//import './react-adv/Hooks/useState'
//import './react-adv/Hooks/useReducer'
//import './react-adv/Hooks/useMemo';
import './react-adv/Hooks/useCallback2';
//import './react-adv/Hooks/useContext'





// context 专门案例
// import './context/demo1/app.js'             // context 使用分析 （基础应用，考虑和 redux 的关系）
// import './context/demo2/app.js'             // context 使用分析 （基础应用，考虑和 redux 的关系）
// 同时使用多个 context 案例比较简单 见官方文档 http://react.css88.com/docs/context.html#dynamic-context 
//import './context/demo3/app.js'             // 在 生命周期函数里 使用 context **重要


// Es6 语法测试相关

//import './es6/import/import1'

// Es6 语法测试相关
//import './es6/import/import1'
//redux状态管理工具
//import './react-adv/redux/basic'                    //基础示例，同步更新。建议直接看例子
//import './react-adv/redux/async'                    //异步数据流，网络请求
//Dva.js  react和redux结合的最佳实践，请移步到dva-quickstart文件夹下查看


// 以下为 蚂蚁金服 Ant Design UI 框架案例

//import './antd-m/Flex'                // Flex 布局
//import './antd-m/WingBlank'           // 两翼留白 布局
//import './antd-m/WhiteSpace'          // 上下留白 布局
//import './antd-m/NavBar'              // 导航栏
//import './antd-m/Popover'             // 气泡
//import './antd-m/Tabs'                // 标签页
//import './antd-m/ListView'            // 长列表
//import './antd-m/ListView1'           // 官方长列表 没有 section 分组数据
//import './antd-m/ListView2'           // 官方长列表 没有 section 分组数据
//import './antd-m/ListView_1'          // 长列表 官方案例 附带详细说明
//import './antd-m/ListView_2'          // 自定义长列表
//import './antd-m/Menu.js'             // 菜单(也包含多级菜单)
//import './antd-m/Menu1.js'            // 菜单 多级菜单
//import './antd-m/Drawer'              // 抽屉菜单 菜单项由 List 构造
//import './antd-m/Drawer_1'            // 抽屉菜单 菜单项由 List 构造
//import './antd-m/List'                // 列表组件
//import './antd-m/TabBar'
//import './antd/Table'                 // 一个普通的表格
//import './antd/Table1'                  // 用到了 column 和 columngroup 组件
//import './antd/Table2'
//import './antd/IconFont'                // IconFont 本地部署
//import './antd/upload'                  // 文件上传

// 以下是动画相关的组件
//import './reactmotion/TweenOne'        // 有问题。
//import './react-motion/motion'
//import './reactmotion/motion1'


// 下面是组合案例
//import './antd-m/LoadModule/App'        // 这是一个程序框架，测试动态加载。


// 下面是一些动画相关的
//import './ant-motion/TweenOne'
//import './ant-motion/timeline'


/**
 * Mobx 案例
 * 路由相关案例：https://github.com/kitze/mobx-router
 */

 //import "./Mobx/01/timer";              // 入门案例１
 //import "./Mobx/01/todolist"              // 入门案例２

 //import "./Mobx/02/promise"             // 用 @action 解决回调修改 state
 //import "./Mobx/02/promise1";           // 用 action() 解决回调函数修改 state
 //import "./Mobx/02/promise2async_await";// async/await 解决回调修改 state
 //import "./Mobx/02/promise3flow_yield"; // Mobx flow 解决异步函数的回调 修改state

 //import "./Mobx/03/observableObj";        // 关于 autorun 的清理和 obserable.object 
 //import "./Mobx/03/stateUi";
//import "./Mobx/03/testApp";

/**
 * Daemon 守护进程案例
 * 利用长轮寻实现 基于 协程的守护进程。
 */

//import "./daemon-demo/index";

// 关于 React 组件的模块化，解耦的设计分析。
//import './react-adv1/module/index'




//ReactDOM.render(<App />, document.getElementById('app'));
registerServiceWorker();

