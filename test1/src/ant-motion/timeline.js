import React from 'react';
import ReactDOM from 'react-dom';
import TweenOne from 'rc-tween-one';
import PropTypes from 'prop-types';
import './style.css'

class Demo extends React.Component {

  constructor(props) {
    super(props);
    this.moment = null;
    this.animation = [
      { delay:2000, left: '-10%' },
      { left: '10%' },
      { top: '60px' },
      { scale: 0.7 },
      { scale: 1 },
      { top: 0 },
      { left: '0%' },
    ];
  }


  render() {
    return (
      <TweenOne
        animation={this.animation}
        paused={this.props.paused}
        repeat={-1} // demo 演示需要，时间轴循环
        yoyo // demo 演示需要，时间轴循环
        style={{ transform: 'scale(1)' }}
        className="code-box-shape"
      />
    );
  }
}
Demo.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  paused: PropTypes.bool,
};
var TweenOneGroup = TweenOne.TweenOneGroup;

function Demo1(){
    return(
        <TweenOneGroup>
            <Demo key='1' />
            <Demo key='2' />
        </TweenOneGroup>
    );
}

ReactDOM.render(<Demo1 />, document.getElementById('root'));