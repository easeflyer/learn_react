/**
 * context 分析。  mvc 模式考虑
 * 
 * app.js  既有数据也有处理函数。
 *    state 状态数据
 *    toggleTheme 事件处理函数。
 *    通过 context 传递了 theme 变量
 * toolbar
 *    UI 组件，包含了一个 ThemedButton
 *    传递了 toggleTheme 函数
 * ThemedButton
 *    从 context 里面拿到 theme 然后渲染效果。
 *    渲染时 如果没有拿到新的 theme 则渲染默认值
 * 
 * 综合分析：利用context 实现 mvc
 * 
 * 通过以上每个组件的功能分析。可以看到。
 * 
  */

// Context lets us pass a value deep into the component tree
// without explicitly threading it through every component.
// Create a context for the current theme (with "light" as the default).
import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeContext, themes } from './theme-context';
import ThemedButton from './themed-button';

const Page = (props) => (
  <div>
    {props.children}
  </div>
)
const Section = (props) => (
  <div>
    {props.children}
  </div>
)


// An intermediate component that uses the ThemedButton
function Toolbar(props) {
  return (
    <ThemedButton onClick={props.changeTheme}>
      Change Theme
    </ThemedButton>
  );
}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: themes.light,
    };

    /**
     * themes.toggleTheme 就类似 redux 的 reducer 返回一个 对象。
     */
    this.toggleTheme = () => {
      this.setState(themes.toggleTheme);
    };
  }

  render() {
    // The ThemedButton button inside the ThemeProvider
    // uses the theme from state while the one outside uses
    // the default dark theme
    return (
      <Page>
        <ThemeContext.Provider value={this.state.theme}>
          <Toolbar changeTheme={this.toggleTheme} />
        </ThemeContext.Provider>
        <Section>
          <ThemedButton>测试按钮</ThemedButton>
        </Section>
      </Page>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));