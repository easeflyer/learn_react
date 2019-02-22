/**
 * 在 生命周期方法里使用 context
 * 重点：包一个壳：看最后的 export 暴露时 实际上是 包上了一个外层组件。而这个外层组件
 * 利用 Consumer 把 context 传递给了 Button 组件。
 */

import React from 'react'
import {ThemeContext} from './theme-context'
class Button extends React.Component {
  componentDidMount() {
    // ThemeContext value is this.props.theme
    console.log('componentDidMount:theme:',this.props.theme)
  }

  componentDidUpdate(prevProps, prevState) {
    // Previous ThemeContext value is prevProps.theme
    // New ThemeContext value is this.props.theme
    console.log('componentDidUpdate:theme:',this.props.theme)
  }

  render() {
    console.log(this.props)
    const { theme, children } = this.props;
    return (
      <button onClick={this.props.toggleTheme}
        style={{ backgroundColor: theme.background }}>
        {children}
      </button>
    );
  }
}

export default props => (
  <ThemeContext.Consumer>
    {state => <Button {...props} toggleTheme={state.toggleTheme} theme={state.theme} />}
  </ThemeContext.Consumer>
);