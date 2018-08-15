import React from 'react';
import ReactDOM from 'react-dom';
import { StaggeredMotion, spring } from 'react-motion';
//import range from 'lodash.range';

class Demo extends React.Component {
    render() {
        return (
            <StaggeredMotion
                defaultStyles={[{ h: 0 }, { h: 0 }, { h: 0 }]}
                styles={prevInterpolatedStyles => prevInterpolatedStyles.map((_, i) => {
                    return i === 0
                        ? { h: spring(100) }
                        : { h: spring(prevInterpolatedStyles[i - 1].h) }
                })}>
                {interpolatingStyles =>
                    <div id='div1' style={{position:'absolute'}}>
                        {interpolatingStyles.map((style, i) =>
                            <div id='div2' key={i} style={{position:'absolute',
                             height:'10px',width:'10px', border: '1px solid red', 
                             top: style.h*i*2 }} />)
                        }
                    </div>
                }
            </StaggeredMotion>
        );
    }
}

ReactDOM.render(<Demo />, document.querySelector('#root'));