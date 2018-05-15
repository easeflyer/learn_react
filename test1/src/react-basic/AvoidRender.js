import React from 'react';
import ReactDOM from 'react-dom';

// warning 提示组件 如果组件属性为false 则不不显示 warning
function WarningBanner(props) {
    if (!props.warn) {
        return null; // 注意组件本身 返回 null 即可组织组件渲染。如果是  class 定义的组件 render 方法返回 null
    }

    return (
        <div className="warning">
            Warning!
      </div>
    );
}

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = { showWarning: true }
        this.handleToggleClick = this.handleToggleClick.bind(this);
    }

    handleToggleClick() { // 注意用 函数的方式来设置 两个状态的交换 因为状态是异步更新的。
        this.setState(prevState => ({
            showWarning: !prevState.showWarning
        }));
    }

    render() {
        return (
            <div>
                <WarningBanner warn={this.state.showWarning} />
                <button onClick={this.handleToggleClick}>
                    {this.state.showWarning ? 'Hide' : 'Show'}
                </button>
            </div>
        );
    }
}

ReactDOM.render(
    <Page />,
    document.getElementById('root')
);

