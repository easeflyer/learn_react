import React from 'react';
import { StickyContainer, Sticky } from 'react-sticky';
 
class App extends React.Component {
  render() {
    return (
        <div>
            <StickyContainer>
                <Sticky>
                {
                    ({
                    style,
                    }) => {
                    return (
                        <header style={style}>header.......
                        </header>
                    )
                    }
                }
                </Sticky>
                <h2>占位符</h2>
                <h2>占位符</h2>
                <h2>占位符</h2>
                <h2>占位符</h2>
                <h2>占位符</h2>
                <h2>占位符</h2>
                <h2>占位符</h2>
                <h2>占位符</h2>
                <h2>占位符</h2>
                <h2>占位符</h2>
                <h2>占位符</h2>
                <h2>占位符</h2>
                <h2>占位符</h2>
                <h2>占位符</h2>
                <h2>占位符</h2>
                <h2>占位符</h2>
                <h2>占位符</h2>
                <h2>占位符</h2>
                <h2>占位符</h2>
    
                </StickyContainer>
        </div>
    );
  }
}

export default App;