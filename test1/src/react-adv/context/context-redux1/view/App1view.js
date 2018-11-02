/**
 * 基本框架已经实现，现在需要 对context 的位置做一下改造：
 * export const ThemeContext = React.createContext(
  themes.dark // default value
);
把 context 导出，然后可以到处导入。
 */

import React from 'react'


const App1view = ({ model, onClick }) => (
  <div>
    <h3>name:{model.name}</h3>
    <h3>msg:{model.msg}</h3>
    <button onClick={onClick}>确认</button>
</div>
)

export default App1view;