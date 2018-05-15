/**
 * 员工数据 也就是表格的一行
 */

import React from 'react';
// 这里同样 暴露 唯一的 StaffItem 组件
export default class StaffItem extends React.Component{
    // render 的内容就是 html 标签的 tr 一行数据。注意class 用 className
    render(){
        return (
              <tr
                style={{'cursor': 'pointer'}}
              > {/* 从这里可以看出 本组件有个 item 属性，用于接收一行数据 */}
                <td className='itemTd'>{this.props.item.info.name}</td>
                <td className='itemTd'>{this.props.item.info.age}</td>
                <td className='itemTd'>{this.props.item.info.id}</td>
                <td className='itemTd'>{this.props.item.info.sex}</td>
                <td className='itemTd'>
                    <a className="itemBtn">删除</a>
                    <a className="itemBtn">详情</a>
                </td>
              </tr>
        );
    }
}