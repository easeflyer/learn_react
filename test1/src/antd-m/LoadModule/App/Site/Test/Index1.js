import Models from '../Models/Models'
const json1 = {
    'model': 'mail.message',
    'method': 'read',
    'args': [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], ['date', 'author_i', 'email_from', 'subject']],
    'kw': {},
    'sid': '90b0c6027b3bd50486c8384d41e2b3ae69c0e525'
}





let m = Models.create()
function fun1(data){
    console.log(data)
}
m.query('exec',json1,fun1);



