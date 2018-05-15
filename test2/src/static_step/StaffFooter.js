/**
 * 新增员工的表单
 */
import React from 'react';
// 只暴露唯一的组件 StaffFooter 采用这种方式，一个文件，只定义一个组件，方便复用。
export default class StaffFooter extends React.Component {

    render() {
        return (
            <div>
                <h4 style={{ 'text-align': 'center' }}>人员新增</h4>
                <hr />
                {/* 这里定义了 ref addForm 后续程序可能会用到 
                表单中很多元素，都用了 ref
            */}
                <form ref='addForm' className="addForm">
                    <div>
                        <label for='staffAddName' style={{ 'display': 'block' }}>姓名</label>
                        <input ref='addName' id='staffAddName' type='text' placeholder='Your Name' />
                    </div>
                    <div>
                        <label for='staffAddAge' style={{ 'display': 'block' }}>年龄</label>
                        <input ref='addAge' id='staffAddAge' type='text' placeholder='Your Age(0-150)' />
                    </div>
                    <div>
                        <label for='staffAddSex' style={{ 'display': 'block' }}>性别</label>
                        <select ref='addSex' id='staffAddSex'>
                            <option value='男'>男</option>
                            <option value='女'>女</option>
                        </select>
                    </div>
                    <div>
                        <label for='staffAddId' style={{ 'display': 'block' }}>身份</label>
                        <select ref='addId' id='staffAddId'>
                            <option value='主任'>主任</option>
                            <option value='老师'>老师</option>
                            <option value='学生'>学生</option>
                            <option value='实习'>实习</option>
                        </select>
                    </div>
                    <div>
                        <label for='staffAddDescrip' style={{ 'display': 'block' }}>个人描述</label>
                        <textarea ref='addDescrip' id='staffAddDescrip' type='text'></textarea>
                    </div>
                    <p ref="tips" className='tips' >提交成功</p>
                    <p ref='tipsUnDone' className='tips'>请录入完整的人员信息</p>
                    <p ref='tipsUnAge' className='tips'>请录入正确的年龄</p>
                    <div>
                        <button>提交</button>
                    </div>
                </form>
            </div>
        )
    }
}