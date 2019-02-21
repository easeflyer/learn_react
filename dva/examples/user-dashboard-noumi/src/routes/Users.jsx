/**
 * 路由组件 Users 也就是 容器组件就是本文件。用 connect 生成的。用于和 UI 组件链接。
 * function Users 是一个外层的 UI 组件（普通UI组件）。其中 Users 和 路由组件链接起来了。
 *    参见 mapStateToProps 把 model 和 UI 链接在了一起。 model 其实就是 state + reducer
 * 
 * 
 */

/** mapStateToProps 详解
        list: [],
        total: null,
        loading: false, // 控制加载状态
        current: null, // 当前分页信息
        currentItem: {}, // 当前操作的用户对象
        modalVisible: false, // 弹出窗的显示状态
        modalType: 'create', // 弹出窗的类型（添加用户，编辑用户）

      这里需要特别注意：正确理解 mapStateToProps
        function mapStateToProps({ users }) { return {users}; }
        这里是把全局 state 中的 users 提取。发送给 UI 组件的 props 中的 users 参数。
        所以 /model/users.js 中model 里面定义的 state 对应的就是这个局部的 users 
        （注意仔细看对应关系，也就是 对象解构的对应关系）
 */

// ./src/routes/Users.jsx
import React from 'react';
import PropTypes from 'prop-types';

// 引入 connect 工具函数
import { connect } from 'dva';

// Users 的 Presentational Component
// 暂时都没实现
import UserList from '../components/Users/UserList';
import UserSearch from '../components/Users/UserSearch';
import UserModal from '../components/Users/UserModal';

// 引入对应的样式
// 可以暂时新建一个空的
import styles from './Users.less';

/**
 * Users 普通 UI 组件，包裹了 UserSearch, UserList, UserModal
 * Props users 从 model中来
 */
function Users({ location, setup, dispatch, users }) {
  const {
    loading, list, total, current,
    currentItem, modalVisible, modalType
  } = users;

  const userSearchProps = {};
  const userListProps = {
    dataSource: list,
    total,
    loading,
    current,
  };
  const userModalProps = {};

  return (
    <div className={styles.normal}>
      {/* 用户筛选搜索框 */}
      <UserSearch {...userSearchProps} />
      {/* 用户信息展示列表 */}
      <UserList {...userListProps} />
      {/* 添加用户 & 修改用户弹出的浮层 */}
      <UserModal {...userModalProps} />
      <button onClick={setup}>加载</button>
    </div>
  );
}

Users.propTypes = {
  users: PropTypes.object,
};

// 指定订阅数据，这里关联了 users，注意这里没有传递其他的 由 路由组件 传递来的参数
function mapStateToProps({ users }) {
  return { users };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setup: () => {
      dispatch({
        type: 'users/querySuccess',
        payload: {}
      });
    }
  }
}

// 建立数据关联关系
export default connect(mapStateToProps, mapDispatchToProps)(Users);