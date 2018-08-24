/**
 * dva 通过 model 的概念把一个领域的模型管理起来，包含同步更新 state 的 reducers，
 * 处理异步逻辑的 effects，订阅数据源的 subscriptions 。
 * 1. namespace 表示在全局 state 上的 key
 * 2. state 是初始值，在这里是空数组
 * 3. reducers 等同于 redux 里的 reducer，接收 action，同步更新 state
 * 一句话：key,数据，业务逻辑 构成了 Model
 * 
 * 
 */

export default {
    namespace: 'products',
    state: [],
    reducers: {
      'delete'(state, { payload: id }) {
        return state.filter(item => item.id !== id);
      },
    },
  };