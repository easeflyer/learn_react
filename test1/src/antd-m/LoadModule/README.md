# 这里写一下代码结构。

app.js                          代码的外层框架 是一个 tabbar
<dir>App                        包含若干子应用
    |__Loadable.js              负责动态加载子应用
    |__Site                     “子应用1”网站官网子应用
        |__Index.js             是一个索引页，定向到子应用默认首页，考虑这里面也定义若干动态加载子应用。这里目前只导入了 BodyDrawer.js
        |__BodyDrawer.js        是“网站的外层包裹” 其中 sidebar 定义菜单，menu 菜单数组（标题，图标，页面） navbar 是顶部导航
        |__Navbar.js            网站的顶部导航，是 BodyDrawer.js 的组成部分，
        |__<dir>Home            “首页” 子应用目录。
            |__Index.js         首页，是Banner 和 GridSection 的包裹
            |__Banner.js        滚动图
            |__GridSection.js   首页的主题部分，包括gird 和 list 列表两个内容。