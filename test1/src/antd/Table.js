import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Table, Icon, Divider } from 'antd';

/**
 * 简单表格的使用
 * 1）定义列 columns
 * 2）组织数据 格式
 * 3）定义表格
 */


// 定义表格的 4 列
const columns = [{
  title: 'Name',    //  表头
  dataIndex: 'name',
  key: 'name',
  render: text => <a href="javascript:;">{text}</a>, // 数据显示样式 这里是一个 箭头函数
}, {
  title: 'Age',
  dataIndex: 'age',
  key: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
  key: 'address',
}, { // 最后一个是各种操作，不包含数据
  title: 'Action',
  key: 'action',
  
  render: (text, record,index) => ( // 注意这个回调函数的3个参数text是当前行的值 record 指向就是本行数据 index 是行索引 // 貌似 text 和 record 没区别
    <span>
      <a href="javascript:;">Action 一 {record.name}</a>
      <Divider type="vertical" /> {/* 竖线 分割线 */}
      <a href="javascript:;">Delete{index}{console.log(text.name)}</a>
      <Divider type="vertical" />
      <a href="javascript:;" className="ant-dropdown-link">
        More actions <Icon type="down" />
      </a>
    </span>
  ),
}];
/**
 * data 数据的格式
 *  1）data 是一个数组。代表 若干行数据。
 *  2）每一行是一个字典对象，key 是列名。value 是列的值。
 *  3）每行数据的 key 应该一致。代表数据的相同列
 */
const data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park',
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}];

ReactDOM.render(<Table columns={columns} dataSource={data} />, document.getElementById('root'));