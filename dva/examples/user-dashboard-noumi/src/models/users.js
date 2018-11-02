// ./src/models/users.js
import { hashHistory } from 'dva/router';

export default {
  namespace: 'users',

  state: {
    list: [],
    total: null,
    loading: false, // 控制加载状态
    current: null, // 当前分页信息
    currentItem: {}, // 当前操作的用户对象
    modalVisible: false, // 弹出窗的显示状态
    modalType: 'create', // 弹出窗的类型（添加用户，编辑用户）
  },

  /**
   * 理解：
   * 在 subscriptions 对象里，加入的函数。都会自动执行。（订阅）
   * 自动执行条件是：users 模型 state 发生变化，或者第一次运行的时候。
   */
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/users') {
          dispatch({
            type: 'querySuccess',
            payload: {}
          });
        }
      });
    },
    test(props){
      console.log('test:',props);
    }
  },

  effects: {
    *query(){},
    *create(){},
    *'delete'(){},
    *update(){},
  },
  reducers: {
    showLoading(){}, // 控制加载状态的 reducer
    showModal(){}, // 控制 Modal 显示状态的 reducer
    hideModal(){},
    // 使用静态数据返回
    querySuccess(state){
      const mock = {
        total: 3,
        current: 1,
        loading: false,
        list: [
          {
            name: '张三1',
            age: 23,
            address: '成都',
          },
          {
            name: '李四1',
            age: 24,
            address: '杭州',
          },
          {
            name: '王五2',
            age: 25,
            address: '上海',
          },
        ],

      };
      return {...state, ...mock, loading: false};
    },
    createSuccess(){},
    deleteSuccess(){},
    updateSuccess(){},
  }
}