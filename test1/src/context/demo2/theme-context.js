import React from 'react'
// Make sure the shape of the default value passed to
// createContext matches the shape that the consumers expect!
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
  // toggleTheme:state => ({
  //   theme:
  //     state.theme === themes.dark
  //       ? themes.light
  //       : themes.dark,
  // })
};

export const ThemeContext = React.createContext({
  theme: themes.dark,
  toggleTheme: () => {},
});