import React from 'react';
import ReactDOM from 'react-dom';
//import PropTypes from 'prop-types';
import TweenOne from 'rc-tween-one';


class Demo1 extends React.Component {
    state = {
        animation: { x: 100, y: 100 },
        zIndex: 2
    }

    onclick = () => {
        this.state.zIndex++;
        this.setState({
            animation: {
                x: 20, y: 20
            },
            zIndex: this.state.zIndex
        })
    }
    onclick1 = () => {
        this.setState({
            animation: {
                x: 200, y: 200
            }
        })
    }
    render() {
        return (
            <TweenOne
                animation={this.state.animation}
                //resetStyle={true}
                style={{ position: 'absolute', top: '10px', left: '10px' }}
            >
                <div style={{ width: '100px', height: '100px', backgroundColor: 'red',zIndex:this.state.zIndex }}></div>
                <button onClick={this.onclick}>测试1</button>
                <button onClick={this.onclick1}>测试2</button>
            </TweenOne>
        )
    }
}

class Demo extends React.Component {
    state = {
        animation: { left: 100, top: 100 }
    }

    onclick = () => {
        this.setState({
            animation: {
                left: 20, top: 20
            }
        })
    }
    onclick1 = () => {
        this.setState({
            animation: {
                left: 200, top: 200
            }
        })
    }
    render() {
        return (
            <TweenOne
                animation={this.state.animation}
                //resetStyle={true}
                style={{ position: 'absolute', top: '10px', left: '10px' }}
            >
                <div style={{ width: '100px', height: '100px', backgroundColor: 'red' }}></div>
                <button onClick={this.onclick}>测试1</button>
                <button onClick={this.onclick1}>测试2</button>
            </TweenOne>
        )
    }
}



ReactDOM.render(<Demo1 />, document.getElementById('root'));
