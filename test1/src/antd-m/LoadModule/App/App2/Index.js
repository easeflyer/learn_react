import React from 'react';

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

const json = {
    'model': 'mail.message',
    'method': 'read',
    'args': [[0, 1, 2, 3], ['date', 'author_i', 'email_from', 'subject']],
    'kw': {},
    'sid': session.get_sid()
}

const url = 'http://192.168.0.11:8069/jsonrpc/exec';

let body = "";
// 查询
fetch(url, {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(json), // data can be `string` or {object}!
    headers: new Headers({
        'Content-Type': 'application/json'
    })
}).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => body = response );





export default class App1 extends React.Component {
    render() {
        return (
            <div>
            <h1>App2。。。 Home.js</h1>
            <div>{JSON.stringify(body)}</div>
            </div>
        );
    }
}

