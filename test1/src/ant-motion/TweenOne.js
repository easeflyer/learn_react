import React from 'react';
import ReactDOM from 'react-dom';

import TweenOne from 'rc-tween-one';
import PropTypes from 'prop-types';
import './style.css';

function Demo(props) {
  return (
    <TweenOne
      animation={{ 
        x: 1280, 
        scale: 0.5, 
        rotate: 120, 
        yoyo: false, // demo 演示需要
        repeat: -1, // demo 演示需要
        delay:1000,
        duration: 1000
      }}
      paused={props.paused}
      className="code-box-shape"
    ><h1>2222222</h1></TweenOne>
  );
}

Demo.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  paused: PropTypes.bool,
};
//ReactDOM.render(<TweenOne style={{width:'50px',height:'50px'}} animation={{ x:100 }} />, document.getElementById('root'));
ReactDOM.render(<Demo />, document.getElementById('root'));