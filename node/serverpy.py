import web
import time
urls = (
    '/', 'index',
    '/client','client',
    '/server','server1',
)

class index:
    def GET(self):
        return "Hello, world!"


class client:
    def GET(self):
        with open('./client.html', 'r',encoding='utf8') as f:   # 注意编码，否则 read() 可能会报错，见案例代码
            str = f.read()
            return str

class server:
    def GET(self):
        
        web.header("Content-Type","text/event-stream")
        web.header("Cache-Control","no-cache")
        web.header("Connection","keep-alive")
        # web.header("Access-Control-Allow-Origin",'*')

        count = 21
        # while True:
        #     count = count + 1
        #     if count<20:
        #         yield "data: {}\n\n".format(count)
        #     else:
        #         break
        while True:
            yield "data: {}\n\n".format(count)

class server1:
    def GET(self):
        web.header("Content-Type","text/event-stream")
        web.header("Cache-Control","no-cache")
        web.header("Connection","keep-alive")
        def genData():
            while True:
                time.sleep(1)
                yield "data: {}\n\n".format(time.asctime( time.localtime(time.time())))
        return genData()            



if __name__ == "__main__":
    app = web.application(urls, globals())
    app.run()