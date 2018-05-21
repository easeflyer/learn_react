import React from 'react';
import ReactDOM from 'react-dom';
import Loadable from 'react-loadable';

// 定义加载时 如何显示。可以考虑动画。
const Loading = () => {
    return <div>Loading...</div>
};

// Home 和 About 是两个组件，会按需加载。用到的时候才会加载。
const Home = Loadable({
    loader: () => import('./Home'),
    loading: Loading,
});

const About = Loadable({
    loader: () => import('./About'),
    loading: Loading,
});

class App extends React.Component {
    state = {
        content: null
    }
    handleClick = (act) => {
        this.setState({ content: act });
    }
    render() {
        return (
            <div>
                <div onClick={() => this.handleClick(<Home />)}>Home</div>
                <div onClick={() => this.handleClick(<About />)}>About</div>
                <div>{this.state.content}</div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));