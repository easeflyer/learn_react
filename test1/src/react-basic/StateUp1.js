import React from 'react'
import ReactDOM from 'react-dom'

// 只负责渲染 提示
function BoilingVerdict(props) {
    if (props.celsius >= 100) {
        return <p>水会烧开</p>;
    }
    return <p>水不会烧开</p>;
}

// 三个温度转换 函数
function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
        return '';
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}



const scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit'
};
/**
 * 温度输入组件
 * 有一个状态参数 temperature 
 */


class TemperatureInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        // 用属性提供的方法 处理 事件。属性提供的方法，又父组件传递下来，并且接受温度作为参数。
        // 也就是当 本输入框发生变化的时候，执行父组件的状态改变函数。
        this.props.onTemperatureChange(e.target.value);
    }

    render() {
        const temperature = this.props.temperature;
        const scale = this.props.scale;
        return (
            <fieldset>
                <legend>在{scaleNames[scale]}:中输入温度数值</legend>
                {/* 温度现实由 temperature 变量提供，也就是由父组件提供，父组件状态变化后，则会更新温度值因此这里会同步变化 */}
                <input value={temperature}
                    onChange={this.handleChange} />
            </fieldset>
        );
    }
}




/**
 * 状态提升
 * 这个案例 把 温度保存在了 Calculator 状态里。
 * 这样  input 组件和 BoilingVerdict 组件都可以访问。
 */



class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
        this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
        this.state = { temperature: '', scale: 'c' };
    }

    handleCelsiusChange(temperature) {
        this.setState({ scale: 'c', temperature }); // temperature 是：temperature：temperature 的简写
    }

    handleFahrenheitChange(temperature) {
        this.setState({ scale: 'f', temperature });
    }

    render() {
        const scale = this.state.scale;
        const temperature = this.state.temperature;
        const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
        const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

        return (
            <div>
                <TemperatureInput
                    scale="c"
                    temperature={celsius}
                    // 把组件的 事件处理函数 传递给 子组件，也就是由子组件可以来更新父组件的状态，这里要特别留意 this 的处理。
                    onTemperatureChange={this.handleCelsiusChange} />
                <TemperatureInput
                    scale="f"
                    temperature={fahrenheit}
                    onTemperatureChange={this.handleFahrenheitChange} />
                <BoilingVerdict
                    celsius={parseFloat(celsius)} />
            </div>
        );
    }
}



ReactDOM.render(
    <Calculator />,
    document.getElementById('root')
);