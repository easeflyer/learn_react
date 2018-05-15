
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class Greeting extends React.Component {
    render() {
        return (
            <h1>Hello, {this.props.name} age:{this.props.age}</h1>
        );
    }
}

// 给组件 Greeting 设定默认值
Greeting.defaultProps = {
    name: 'Stranger'
};

Greeting.propTypes = {
    name: PropTypes.string.isRequired, // name 属性必须
    age: PropTypes.string,
    children: PropTypes.element.isRequired,
    //requiredFunc: PropTypes.name.isRequired,
    //customProp 自定义属性 props 所有属性 propName 要验证的属性 customProp
    customProp: function (props, propName, componentName) {
        // 如果 propName 属性不包含 matchme 则报错
        if (!/matchme/.test(props[propName])) {
            return new Error(
                'Invalid prop `' + propName + '` supplied to' +
                ' `' + componentName + '`. Validation failed.'
            );
        }
    },
};
// index.js:2178 Warning: Failed prop type: Invalid prop `children` of type `array` supplied to `Greeting`, 
// expected a single ReactElement.in Greeting (at PropTypes.js:30)
// 只允许一个单独的 子元素

let greeting = ( 
    <Greeting age="22" customProp="matchmeeeeeeeee">
        <div>33</div>
        <div>22</div>
    </Greeting>
);


ReactDOM.render(greeting, document.getElementById('root'));
// Warning: Failed prop type: Invalid prop `name` of type `boolean` supplied to `Greeting`, expected `string`.
//     in Greeting (at PropTypes.js:
// 出于性能的原因，propTypes 仅在开发模式中检测。