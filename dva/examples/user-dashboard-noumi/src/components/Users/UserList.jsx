// ./src/components/Users/UserList.jsx
import React, { Component, PropTypes } from 'react';

// 采用antd的UI组件
import { Table, message, Popconfirm } from 'antd';

/**
 * UserList 组件 采用 stateless 方式定义。也就是纯UI组件。
 * 这里引入了 antd 的 Table 组件。参考 antd 相关文档。
 *    columns 列定义，参考 antd 相关文档。
 *    pagination 分页定义
 * 
 * 注意本 UI 组件实际上重点是 andt  table 如何使用。以及分页方法。
 *    
 */
const UserList = ({total,current,loading,dataSource,}) => {
  // 列定义
  const columns = [{
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a href="#">{text}</a>,
  }, {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  }, {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  }, {
    title: '操作',
    key: 'operation',
    render: (text, record) => (
      <p>
        <a onClick={() => { }}>编辑</a>
        &nbsp;
        <Popconfirm title="确定要删除吗？" onConfirm={() => { }}>
          <a>删除</a>
        </Popconfirm>
      </p>
    ),
  }];

  // 定义分页对象
  const pagination = {
    total,
    current,
    pageSize: 10,
    onChange: () => { },
  };

  return (
    <div>
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        rowKey={record => record.id}
        pagination={pagination}
      />
    </div>
  );
}

export default UserList;