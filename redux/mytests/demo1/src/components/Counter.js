import React from 'react'

export default class Counter extends React.Component{
    render(){
        return(
            <div>
            {this.props.value}
            <button onClick={this.props.onIncrease}>+</button>
            <button onClick={this.props.onDecrease}>-</button>
            </div>
        )
    }
}