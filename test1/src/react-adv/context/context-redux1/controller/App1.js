import React from 'react'
import App1view from '../view/App1view'
class App1 extends React.Component{
  constructor(props){
    super(props)
    this.state = props.model;
    console.log(props)
  }
  handleClick = ()=>{
    this.props.model.msg += "x"
    this.setState({
      msg:this.props.model.msg
    })
  }

  render(){
    return(
      <App1view model={this.state} onClick={this.handleClick} />
    )
  }
}

export default App1;