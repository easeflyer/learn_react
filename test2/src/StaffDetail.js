/**
 * 员工详情
 * 点击员工详情 才会弹出
 */

import React from 'react';
// 暴露 仅有的 StaffDetail 组件，保持一个文件，只有一个组件
export default class StaffDetail extends React.Component{

    render(){
      let staffDetail = this.props.staffDetail;  
      if(!staffDetail)
        return null;

      return (
          <div className="overLay">
            <h4 style={{'text-align':'center'}}>点击'完成'保存修改,点击'关闭'放弃未保存修改并退出.</h4>
            <hr/>
            <table ref="editTabel">
              <tbody>
                <tr>
                  <th>姓名</th>
                  {/*注意这里使用了 defaultValue 这是  react 规范的做法，而不是写在 value 里 */}
                  <td><input id='staffEditName' type="text" defaultValue={staffDetail.info.name}></input></td>
                </tr>
                <tr>
                  <th>年龄</th>
                  <td><input id='staffEditAge' type="text" defaultValue={staffDetail.info.age}></input></td>
                </tr>
                <tr>
                  <th>性别</th>
                  <td>
                    <select ref='selSex' id='staffEditSex'>
                      <option value="男">男</option>
                      <option value="女">女</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <th>身份</th>
                  <td>
                    <select ref="selId" id='staffEditId'>
                      <option value="主任">主任</option>
                      <option value="老师">老师</option>
                      <option value="学生">学生</option>
                      <option value="实习">实习</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <th>个人描述</th>
                  <td><textarea id='staffEditDescrip' type="text" defaultValue={staffDetail.info.descrip}></textarea></td>
                </tr>
              </tbody>
            </table>
            <p ref='Dtips' className='tips'>修改成功</p>
            <p ref='DtipsUnDone' className='tips'>请录入完整的人员信息</p>
            <p ref='DtipsUnAge' className='tips'>请录入正确的年龄</p>
            <button>完成</button>
            <button>关闭</button>
          </div>
      );
    }
}