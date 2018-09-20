import dva from 'dva';
import './index.css';

// 1. Initialize初始化，创建应用
const app = dva();

// 2. Plugins配置hooks或者注册插件
app.use({});

// 3. Model这里是逻辑模块，注册Model（这里的model实际上是双向绑定里view--model中的model，意思就是他就是视图响应的数据源state）
/*model对象有很多属性
        namespace: 当前 Model 的名称。整个应用的 State，由多个小的 Model 的 State 以 namespace 为 key 合成
        state: 该 Model 当前的状态。数据保存在这里，直接决定了视图层的输出
        reducers: Action 处理器，处理同步动作，用来算出最新的 State,多个函数组成的对象
        effects：Action 处理器，处理异步动作,基于 Redux-saga 实现，多个函数组成的对象，Effect 是一个 Generator 函数，
                内部使用 yield 关键字，标识每一步的操作，dva 提供多个 effect 函数内部的处理函数，call：执行异步函数
                put：发出一个 Action，类似于 dispatch
*/
app.model(require('./models/example').default);

// 4. Router注册视图
app.router(require('./router').default);

// 5. Start启动应用
app.start('#root');
