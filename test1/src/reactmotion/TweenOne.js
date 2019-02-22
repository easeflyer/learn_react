import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import TweenOne from 'rc-tween-one';
import './demo.css';

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
/**
 * state 保存 animation lef, top
 * 按钮 出发修改 left, top state
 * 
 * 动画解析：
 *  animation: { left: 100, top: 100 } 决定了目标位置
 *  style={{ position: 'absolute', top: '10px', left: '10px' }} 是动画元素起始的位置。
 *  他只是一个单纯的 div 需要有绝对定位才能动。
 * 
 */
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

/**
 * 官方案例
 * style className 都是 div 的默认样式和位置
 * 而 animation 则是目标位置和样式
 */
function Demo3(props) {
  return (
    <TweenOne
      animation={{
        x: 80,
        scale: 0.5,
        rotate: 120,
        yoyo: true, // demo 演示需要
        repeat: -1, // demo 演示需要
        duration: 1000
      }}
      paused={props.paused}
      style={{ transform: 'translateX(-80px)' }}
      className="code-box-shape"
    />
  );
}

Demo3.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  paused: PropTypes.bool,
};


ReactDOM.render(<Demo3 />, document.getElementById('root'));
