/**
 * 员工信息表
 * 展示由父组件传入的各个人员条目
 */

import React from 'react';
import StaffItem from './StaffItem.js'; //这里要引入 一行数据的组件
export default class StaffItemPanel extends React.Component{

    render(){
        let items = [];  // 对于表格的所有行。定义一个数组，注意数组必须是 react 组件组成。才能直接渲染。
        //这里可以看出 本组件 接受一个 items 的 prop 属性用于传递数据。
        // 如果数据为空，则显示一条提示。
        if(this.props.items.length == 0) { 
            items.push(<tr><th colSpan="5" className="tempEmpty">暂无用户</th></tr>);
        }else {
            // 用数组的 forEach 方法遍历数组。方法接受一个回调函数，处理每条数据。
            this.props.items.forEach(item => {
                // 注意一定要定义 key 这是 react 的规范。 item 是一行数据
                items.push(<StaffItem key={item.key} item={item}/>); // 直接压入 react 组件
            });
        }

        // 上面构建完 {items} 组件数组，也就是行数组，面直接渲染即可。
        return (
          <table className='itemPanel'>
            <thead>
                <th className='itemTd'>姓名</th>
                <th className='itemTd'>年龄</th>
                <th className='itemTd'>身份</th>
                <th className='itemTd'>性别</th>
                <th className='itemTd'>操作</th>
            </thead>
            <tbody>{items}</tbody>
          </table>
        );
    }
}