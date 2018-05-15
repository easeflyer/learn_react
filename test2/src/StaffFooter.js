/**
 * 新增员工的表单
 */
import React from 'react';
// 只暴露唯一的组件 StaffFooter 采用这种方式，一个文件，只定义一个组件，方便复用。
export default class StaffFooter extends React.Component {
  handlerAddClick(evt){
        evt.preventDefault(); // 阻止 默认行为，浏览器刷新提交
        let item = {};
        //let addForm = React.findDOMNode(this.refs.addForm); 旧语法吧？
        let addForm = this.refs.addForm;
        let sex = addForm.querySelector('#staffAddSex'); // querySelector, 可以返回一个 dom 元素，类似 jq 选择器
        let id = addForm.querySelector('#staffAddId');   // 这两个元素 单独提取，因为他们都是 select 元素。

        item.name = addForm.querySelector('#staffAddName').value.trim(); // 其他元素，直接赋值给了 item
        item.age = addForm.querySelector('#staffAddAge').value.trim();
        item.descrip = addForm.querySelector('#staffAddDescrip').value.trim();
        item.sex = sex.options[sex.selectedIndex].value;
        item.id = id.options[id.selectedIndex].value;

        /*
         *表单验证
         */
        if(item.name=='' || item.age=='' || item.descrip=='') { // 任何一项信息 录入不全
            //let tips = React.findDOMNode(this.refs.tipsUnDone); // 找到一个错误提示。
            let tips = this.refs.tipsUnDone; // 找到一个错误提示。
            tips.style.display = 'block';                       // 显示错误提示
            setTimeout(function(){                              // 1秒后 错误提示消失
                tips.style.display = 'none';
            }, 1000);
            return;
        }
        //非负整数 对 age 做验证
        let numReg = /^\d+$/;
        if(!numReg.test(item.age) || parseInt(item.age)>150) {
            let tips = React.findDOMNode(this.refs.tipsUnAge);
            tips.style.display = 'block';
            setTimeout(function(){
                tips.style.display = 'none';
            }, 1000);
            return;
        }
        // 这里看出 addStaffItem 属性被传递进来一个函数。用来添加一条记录。
        this.props.addStaffItem(item);
        addForm.reset(); // 清空数据

        //此处应在返回添加成功信息后确认
        //let tips = React.findDOMNode(this.refs.tips);
        let tips = this.refs.tips;
        tips.style.display = 'block';
        setTimeout(function(){
            tips.style.display = 'none';
        }, 1000);
    }


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
                    {/* 这里定义了3行提示信息 并且都给了 ref 属性，便于直接引用 */}
                    <p ref="tips" className='tips' >提交成功</p>
                    <p ref='tipsUnDone' className='tips'>请录入完整的人员信息</p>
                    <p ref='tipsUnAge' className='tips'>请录入正确的年龄</p>
                    <div>
                        {/* 添加 事件处理 注意要绑定 this*/}
                        <button onClick={this.handlerAddClick.bind(this)}>提交</button>
                    </div>
                </form>
            </div>
        )
    }
}
