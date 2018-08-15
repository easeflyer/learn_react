var http = require("http");

http.createServer(function (req, res) {
    var fileName = "." + req.url;
    console.log(req.url);

    if (fileName === "./server") {
        let date = new Date();
        res.writeHead(200, {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "Access-Control-Allow-Origin": '*',
        });
        res.write("retry: 10000\n");
        res.write("data: " + (new Date()) + "\n\n");
        res.write("data: " + (new Date()) + "\n\n");
        interval = setInterval(function () {
            let d = (new Date()).getSeconds();
            res.write("data: " + d + "\n\n");
            //ifres.write("event: connecttime\n");
        }, 1000);

        req.connection.addListener("close", function () {
            clearInterval(interval);
        }, false);
    }
}).listen(8081, "127.0.0.1");
