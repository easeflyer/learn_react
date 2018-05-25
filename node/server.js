
const express = require('express');
const app = express();
const fs = require('fs');
const url = require('url');

app.get('/server', function (req, res) {
    res.set({
        'Content-Type':'text/event-stream',
        'Cache-Control':'no-cache',
        'Connection':'keep-alive',
        'Access-Control-Allow-Origin': '*',
    });
    let date = new Date();
    let data = date.getSeconds();
    //res.send("retry: 10000\n");
    //res.send("event: connecttime\n");    
    res.send('data:'+data+'\n\n');
})


app.get('/client.html', function (req, res) {
    res.sendFile( __dirname + "/" + "client.html" );
 })




const server = app.listen(8081, function () {

    const host = server.address().address
    const port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

})
