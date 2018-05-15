import React from 'react'
import ReactDOM from 'react-dom'

function BoilingVerdict(props) {
    if (props.celsius >= 100) {
        return <p>水会烧开</p>;
    }
    return <p>水不会烧开</p>;
}

/**
 * 状态提升
 * 这个案例 把 温度保存在了 Calculator 状态里。
 * 这样  input 组件和 BoilingVerdict 组件都可以访问。
 */

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = { temperature: '' }; // 温度 状态
    }

    handleChange(e) {
        // 当 input 变化的时候 修改状态，重新渲染
        this.setState({ temperature: e.target.value });
    }

    render() {
        const temperature = this.state.temperature;
        return (
            <fieldset>
                <legend>输入一个摄氏温度</legend>
                <input
                    value={temperature}
                    onChange={this.handleChange} />
                <BoilingVerdict
                    celsius={parseFloat(temperature)} />
            </fieldset>
        );
    }
}

ReactDOM.render(
    <Calculator />,
    document.getElementById('root')
);