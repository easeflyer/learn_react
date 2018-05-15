import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Table, Icon, Divider } from 'antd';

const { Column, ColumnGroup } = Table;

const data = [{
    key: '1',
    firstName: 'John',
    lastName: 'Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
}, {
    key: '2',
    firstName: 'Jim',
    lastName: 'Green',
    age: 42,
    address: 'London No. 1 Lake Park',
}, {
    key: '3',
    firstName: 'Joe',
    lastName: 'Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
}];
// 这个 Table 是 双标签。用到了 Column 组件 和 ColumnGroup 组件。 实际上是 Table.js 案例中 Table 组件的语法糖。
ReactDOM.render(
    <Table dataSource={data}>
        <ColumnGroup title="Name">
            <Column
                title="First Name"
                dataIndex="firstName"
                key="firstName"
            />
            <Column
                title="Last Name"
                dataIndex="lastName"
                key="lastName"
            />
        </ColumnGroup>
        <Column
            title="Age"
            dataIndex="age"
            key="age"
        />
        <Column
            title="Address"
            dataIndex="address"
            key="address"
        />
        <Column  // 最后一列 没有 dataIndex 是操作列
            title="Action"
            key="action"
            render={(text, record) => (
                <span>
                    <a href="javascript:;">Action 一 {record.name}</a>
                    <Divider type="vertical" />
                    <a href="javascript:;">Delete</a>
                    <Divider type="vertical" />
                    <a href="javascript:;" className="ant-dropdown-link">
                        More actions <Icon type="down" />
                    </a>
                </span>
            )}
        />
    </Table>
    , document.getElementById('root'));