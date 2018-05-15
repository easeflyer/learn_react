/**
 * 头部 操作框
 */

import React from 'react';
// 注意这里只 暴露 StaffHeader 组件
export default class StaffHeader extends React.Component{
    // render 方法里 就只是 html 的页面结构。以及必要的 css
    render(){
        return (
          <div>
              <h3 style={{'text-align':'center'}}>人员管理系统</h3>
              <table className="optHeader">
                <tbody>
                  <tr>
                    <td className="headerTd"><input type='text' placeholder='Search...' /></td>
                    <td className="headerTd">
                        <label for='idSelect'>人员筛选</label>
                        <select id='idSelect'>
                            <option value='0'>全部</option>
                            <option value='1'>主任</option>
                            <option value='2'>老师</option>
                            <option value='3'>学生</option>
                            <option value='4'>实习</option>
                        </select>
                    </td>
                    <td>
                        <label for='orderSelect'>排列方式</label>
                        <select id='orderSelect'>
                            <option value='0'>身份</option>
                            <option value='1'>年龄升</option>
                            <option value='2'>年龄降</option>
                        </select>
                    </td>
                  </tr>
                </tbody>
              </table>
          </div>
        );
    }
}