import React from 'react';
import ReactDOM from 'react-dom';
//import 'antd-mobile/dist/antd-mobile.css'; // 这一句是从哪里引入的？
//import 'antd/dist/antd.css'; // 这一句是从哪里引入的？
import { Toast, Modal, Button } from 'antd-mobile';

/**
 * use to handle session
 * localstorage is a html5 local storage solution
 * set_sid(sid) set sid into localstorage
 * get_sid()    get sid from the local or return false if no.
 * destroy()    remove sid from localstorage
 */
const session = {
    sid: null,
    set_sid: function (sid) {
        localStorage.sid = sid;
        this.sid = sid;
    },
    get_sid: function () {
        if (localStorage && localStorage.sid) {
            return localStorage.sid;
        } else {
            return false;
        }
    },
    destroy: function(){
        if (localStorage && localStorage.sid) localStorage.removeItem('sid');
    }
};
/**
 * 
 */
class SiteLogin {
    // 注册 callback 登录成功后调用外部的 callback 函数
    constructor(callback) {
        //this.hasLogin = false;
        this.callback = callback; 
    }
    /**
     * show login window, call handeLogin callback function
     * handeLogin responsible for handle logins and invoking callbacks from outside registration
     */
    login() {
        console.log("this2......")
        console.log(this)
        const prompt = Modal.prompt;
        prompt(
            '用户登录',
            '请输入登录信息',
            this.handleLogin,
            'login-password',
            null,
            ['请输入用户名', '请输入密码'],
            'ios' //  android
        );
    }
    // 用户名密码由 prompt 调用时提供。
    handleLogin = (login, password) => {
        //alert(test);
        console.log(`login: ${login}, password: ${password}`)
        const json1 = {
            'user': login,  //1174809@qq.com
            'password': password,//09090909
        }
        fetch("http://192.168.0.11:8069/jsonrpc/login", {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(json1), // data can be `string` or {object}!
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(data => {
                console.log(data)
                if (data.result.sid) {
                    //this.hasLogin = true; // 貌似没用，可以去掉这个属性。有了回调函数就可以了。
                    session.set_sid(data.result.sid)
                    Toast.success("登录成功！", 1);
                    this.callback();   // 调用外部传进来的 callback() 用于登录成功后修改 navbar 的样式。
                } else {
                    //this.hasLogin = false;
                    Toast.fail("登录失败，请检查后重试！", 1);
                }
            });

    }

}

//export default login;

export { session, SiteLogin }
