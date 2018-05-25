/**
 * 新建一个 服务器数据链接。
 * 这个链接应该是一个单例模式。
 * 第一次链接。创建链接，保存 sid。 以后每次链接，取出对象即可。
 */

class Models {

    /**
     * @param {*} type 'exec','login','userexec','adminexec' 对应不同的 api 接口执行权限不同。
     * 单例模式，如果已经有对象了，就直接取出来，无需重新实例化。
     */
    static create(){
        if(Models.models === null){
            Models.models = new Models();
            return Models.models;
        }else{
            Models.models;
        }
    }
    query(type='exec',json={},callback) {
        const url = Models.types[type]
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
                    //this.setState({ items: <b>AccessDenied</b> })
                    console.log('AccessDenied')
                } else {
                    // const items = body.map((el, index) => (
                    //     <Item key={index} thumb="http://img5.imgtn.bdimg.com/it/u=3318747708,1678519635&fm=27&gp=0.jpg" multipleLine>
                    //         {el.id}:{el.subject}<Brief>{el.date}<br />{el.email_from}</Brief>
                    //     </Item>
                    // ));
                    //this.setState({ items: items })
                    callback(body);
                }
            });
    }
}



const json1 = {
    'model': 'mail.message',
    'method': 'read',
    'args': [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], ['date', 'author_i', 'email_from', 'subject']],
    'kw': {},
    'sid': '90b0c6027b3bd50486c8384d41e2b3ae69c0e525'
}
Models.models = null;
Models.types = {
    'exec':'http://192.168.0.11:8069/jsonrpc/exec',
    'login':'http://192.168.0.11:8069/jsonrpc/login'
}

let m = Models.create()
m.query('exec',json1,(data)=>console.log(data));




