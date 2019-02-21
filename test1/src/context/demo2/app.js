/**
 * 结合 demo1  主要考虑 context 如何实现 mvc 更合理
 * 
 * App.js
 *    toggleTheme 事件处理函数
 *    state 状态数据，状态数据中包含以上处理函数
 *    
 * 所谓更新 Context
 *    注意 state 中包含数据，包含数据处理函数。而数据变化后。
 *    被重新render 因此 context 的 provider 随之改变。
 * 
 */

import React from 'react'
import ReactDOM from 'react-dom'
import {ThemeContext, themes} from './theme-context';
import ThemeTogglerButton from './theme-toggler-button';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.toggleTheme = () => {
      this.setState(state => ({
        theme:
          state.theme === themes.dark
            ? themes.light
            : themes.dark,
      }));
    };

    // State also contains the updater function so it will
    // be passed down into the context provider
    this.state = {
      theme: themes.light,
      toggleTheme: this.toggleTheme,
    };
  }

  render() {
    // The entire state is passed to the provider
    return (
      <ThemeContext.Provider value={this.state}>
        <Content />
      </ThemeContext.Provider>
    );
  }
}

/**
 * Content 只是单纯增加了层次。为了演示 context 用法
 */
function Content() {
  return (
    <div>
      <ThemeTogglerButton />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));