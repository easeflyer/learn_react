# 这里写一下代码结构。

app.js                          代码的外层框架 是一个 tabbar
<dir>App                        包含若干子应用
    |__Loadable.js              负责动态加载子应用
    |__Site                     “子应用1”网站官网子应用
        |__Index.js             是一个索引页，定向到子应用默认首页，考虑这里面也定义若干动态加载子应用。
        |__<dir>Home            “首页” 子应用目录。