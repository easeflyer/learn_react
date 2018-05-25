import React from 'react';
import { List, } from 'antd-mobile';
// import { Icon } from 'antd'
// import './GridSection.css'
//import './Index1.js' // 用于测试。
const Item = List.Item;
const Brief = Item.Brief;


// 代码应该用 单例模式，没几行代码，占用资源少，就无所谓了。
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
    }
};

let body = "";
export default class App1 extends React.Component {
    state = { items: null }
    componentDidMount() {
        const url = 'http://192.168.0.11:8069/jsonrpc/exec';
        const json = {
            'model': 'mail.message',
            'method': 'read',
            'args': [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], ['date', 'author_i', 'email_from', 'subject']],
            'kw': {},
            'sid': session.get_sid()
        }
        fetch(url, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(json), // data can be `string` or {object}!
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                body = response.result
                console.log('body..............');
                console.log(body);
                if ('message：' in body) {
                    this.setState({ items: <b>AccessDenied</b> })
                }else{
                    const items = body.map((el, index) => (
                        <Item key={index} thumb="http://img5.imgtn.bdimg.com/it/u=3318747708,1678519635&fm=27&gp=0.jpg" multipleLine>
                            {el.id}:{el.subject}<Brief>{el.date}<br />{el.email_from}</Brief>
                        </Item>
                    ));
                    this.setState({ items: items })
                }
            });
    }
    render() {
        return (
            <List renderHeader={() => '网站新闻'} className="my-list">
                {this.state.items}
            </List>
        );
    }
}

