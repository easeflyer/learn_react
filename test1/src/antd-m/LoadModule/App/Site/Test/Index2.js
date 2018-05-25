import React from 'react';
import { List, } from 'antd-mobile';
// import { Icon } from 'antd'
// import './GridSection.css'
//import './Index1.js' // 用于测试。
import Models from '../Models/Models'
const Item = List.Item;
const Brief = Item.Brief;


export default class App1 extends React.Component {
    state = { items: null }
    componentDidMount() {
        const m = Models.create();
        const json = {
            'model': 'mail.message',
            'method': 'read',
            'args': [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], ['date', 'author_i', 'email_from', 'subject']],
            'kw': {},
        }
        const cb = (data) => {
            if ('message：' in data) {
                this.setState({ items: <b>AccessDenied</b> })
            }else{
                const items = data.map((el, index) => (
                    <Item key={index} thumb="http://img5.imgtn.bdimg.com/it/u=3318747708,1678519635&fm=27&gp=0.jpg" multipleLine>
                        {el.id}:{el.subject}<Brief>{el.date}<br />{el.email_from}</Brief>
                    </Item>
                ));
                this.setState({ items: items })
            }
        }
        m.query('exec',json,cb) // 执行 exec 发送 json 获取数据后 执行回调 cb
    }
    render() {
        return (
            <List renderHeader={() => '网站新闻22'} className="my-list">
                {this.state.items}
            </List>
        );
    }
}

