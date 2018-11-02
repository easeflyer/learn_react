/**
 * 在单独文件定义 context 
 * 有点像单独一个文件定义 model
 * 
 * 定义好之后，把 Context 对象导出。themes 变量也导出。
 * 一个是 context 工具，一个是数据。
 */

/**
 * 扩展分析
 * 可以把 themes 写成一个 class 返回一个 "model" 对象。
 * 这个 model 就是一个 状态对象。
 * 用 桥牌游戏验证一下再说吧。
 * 
 */


import React from 'react'
export const themes = {
  light: {
    foreground: '#000000',
    background: '#eeeeee',
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222',
  },
  // 返回一个对象{theme:themes.light 或者 themes.dark}
  toggleTheme:state => ({
    theme:
      state.theme === themes.dark
        ? themes.light
        : themes.dark,
  })
};

export const ThemeContext = React.createContext(
  themes.light // default value
);