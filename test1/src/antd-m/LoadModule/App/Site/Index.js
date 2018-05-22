/**
 * Site 桥牌官网 入口程序。
 * 这里是独立的 子项目。 subapp 应该具有独立的框架，state等。
 * 另外应该包含若干子栏目。每个子栏目单独一个文件夹。子栏目也应该是一个subapp 具有比较独立的空间。
 * 
 * 
 * 本页面只是起到一个 索引的作用。Site 目录下其他所有子目录是 网站的各个子栏目。
 * 由本文件见负责 引入具体的子栏目。修改本文件可以重定向到其他首页。
 */
import React from 'react';
//import Home from './Home/Index'
import BodyDrawer from './BodyDrawer'

/**
 * 入口是由一个抽屉组成的。所有内容放在抽屉里面。根据抽屉的 状态变化。展示不同的内容。
 * BodyDrawer 是抽屉
 *  sidebar 是抽屉菜单
 *  pagecontent 抽屉要显示的页面内容。
 * 
 */
// const sidebar = (<List>
//     {[0, 1, 2, 3, 4, 5, 6].map((i, index) => {
//         if (index === 0) {
//             return (<List.Item key={index}
//                 thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
//                 multipleLine
//                 onClick={() => this.onMenuClick(index)}
//             >Category</List.Item>);
//         }
//         return (<List.Item key={index}
//             thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
//             onClick={() => this.onMenuClick(index)}
//         >Category{index}</List.Item>);
//     })}
// </List>);

// const Index = () => (
//     <BodyDrawer sidebar={sidebar} >
//         <Home />
//     </BodyDrawer>
// );

export default BodyDrawer;
