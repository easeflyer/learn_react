import React from 'react'
export default class Module1 extends React.Component {
  render(){
    console.log('m1.props:',this.props)
    return(
      <h3>Module1</h3>
    )
  }
}