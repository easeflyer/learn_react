# 一个用  MobX Router 组合的开发框架。

没有使用任何其他额外框架。只有简单的目录结构和 MobX Router 的结合使用。

## 结构说明

目录结构：
src
    |-App
          |- component
              |- app.js
              |- login.js
          |- stores
              |- commonStore.js
              |- loginStore.js
    |- agent.js


index.js         引入 项目所需要的所有 Store 也就是模型。通过 Provider 提供给 App 组件。
                        Store 是纯类，参考 MobX 的 Store 定义。数据应用的模型部分。包含UI State
                        和 业务逻辑的 State

app.js            编写 App 的路由，也就是所有子组件，子项目。放在

login.js          具体的功能组件（容器组件+视图组件）
                        组件中调用 authStore.login()  （actions） 
                        authStore 属于业务逻辑相关 Store
                        调用 agent.Auth.login()   ajax 操作。（传输层的代码）

stores            负责保存 Store 也就是 react 的 State 和修改 state 的 action
                  可以用 npm test 进行单独测试。（yarn test）
agent.js          属于传输代理。应该链接 Api 或者 链接模拟数据。
                        每个业务模型，定义一个 普通类{} 对应传输层的 ajax 调用。
                         ajax 请求可以采用原生 fetch 或者 Axios库（建议），SuperAgent ，request 等库来实现

核心知识点：

MobX 库：     负责响应式编程，负责提供 Store 和 普通组件的解耦。构建MVC 设计模式
Context：     React 负责祖先后代之间传递数据。用于对 Store 的传入。
Router组件： React 路由组件，否则拆分子组件。定义应用的模块结构。
Axios：           负责 ajax 传输层的代码。也可以用 原生 Fetch
