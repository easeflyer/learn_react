import React from 'react';
import ReactDOM from 'react-dom';

/**
 * 把 PureComponent 要理解了。
 */


class Com1 extends React.PureComponent{
    render(){
        console.log("Com1 刷新"+ this.props.p1)
        return(<h2>Com1</h2>);
    }
}

class Com2 extends React.PureComponent{
    render(){
        console.log("Com2 刷新"+ this.props.p2)
        return(<h2>Com2</h2>);
    }
}



class App extends React.Component{
    state={
        p1:0,
        p2:1
    }
    render(){

        return <div>
            <Com1 p1={this.state.p1} />
            <hr />
            <Com2 p2={this.state.p2}/>
            <hr />
            <button onClick={()=>this.setState({p1:this.state.p1+1})}>p1+1</button>
            <button onClick={()=>this.setState({p2:this.state.p2+1})}>p2+1</button>
        </div>
    }
}




ReactDOM.render(<App />, document.getElementById('root'));
