import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Table } from 'antd';

// 列定义
const columns = [{
    title: 'Name',
    dataIndex: 'name',
    render: text => <a href="javascript:;">{text}</a>,
}, {
    title: 'Age',
    dataIndex: 'age',
}, {
    title: 'Address',
    dataIndex: 'address',
}];

// 数据定义
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
}, {
    key: '4',
    name: 'Disabled User',
    age: 99,
    address: 'Sidney No. 1 Lake Park',
}];

// rowSelection object indicates the need for row selection
const rowSelection = {
    // 当点击的时候触发本函数
    // selectedRowKeys 是被选中的列key数组，selectedRows 是被选中的行数据数组
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    // 选择框的默认属性配置，也就是说：选择框在渲染的时候，他的各个属性值是什么。下面配置了 disabled 属性（只有一行为true） name 属性用的是 record.name 
    // 注意 name 属性可能用于表单提交。
    getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked 设置关闭跟航数据
        checked:record.name==='Joe Black'? 'checked':'', // 默认选中的行
        name: record.name,
    }),
};

ReactDOM.render(
    <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
    , document.getElementById('root'));