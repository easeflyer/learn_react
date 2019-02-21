/**
 * 本案例主要看生命周期方法里，如何使用 context
 * 从 context 语法中可以看出 使用 context 需要用到 <Consumer> 标签。因此第一印象
 * 只能在 render 里使用。情况看 button 代码。
 */

import React from 'react'
import ReactDOM from 'react-dom'
import Button from './button'
import { ThemeContext, themes } from './theme-context'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: themes.dark,
      toggleTheme: this.toggleTheme
    };
  }
  toggleTheme = () => {
    this.setState(({ theme }) => ({
      theme: theme === themes.light
        ? themes.dark
        : themes.light
    }));
  }

  render() {
    return (
      <ThemeContext.Provider value={this.state}>
        <Button>测试按钮</Button>
      </ThemeContext.Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));