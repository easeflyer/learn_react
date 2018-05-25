# 这里写一下代码结构。

app.js                          代码的外层框架 是一个 tabbar
<dir>App                        包含若干子应用
    |__Loadable.js              负责动态加载子应用
    |__Site                     “子应用1”网站官网子应用
        |__Index.js             是一个索引页，定向到子应用默认首页，考虑这里面也定义若干动态加载子应用。这里目前只导入了 BodyDrawer.js
        |__BodyDrawer.js        是“网站的外层包裹” 其中 sidebar 定义菜单，menu 菜单数组（标题，图标，页面） navbar 是顶部导航
        |__Navbar.js            网站的顶部导航，是 BodyDrawer.js 的组成部分，
        |__<dir>Models          用来保存 site 子应用的 model 部分，也就是和数据库交流的部分。
        |__<dir>Common          公用目录，放一些公共的代码比如 Login.js
        |__<dir>Home            “首页” 子应用目录。
            |__Index.js         首页，是Banner 和 GridSection 的包裹
            |__Banner.js        滚动图
            |__GridSection.js   首页的主题部分，包括gird 和 list 列表两个内容。
    |__App2
        |__



# 代码说明

Common/                     用来保存公用代码
    |__Login.js             session 是个公用的 session 处理对象。用来存取本地的session数据，以及销毁session（退出）
                            SiteLogin 用于完成模态的登录动作，并且注册进来外部的回调函数，登录成功后执行外部的回调函数。完成登录后界面的调整。

Models/                     计划用于保存和后台数据打交到的所有代码。