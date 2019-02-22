import { withRouter } from 'react-router-dom';
import React from 'react';
import { inject, observer } from 'mobx-react';



@inject('testStore')
@withRouter
@observer
class Test extends React.Component {
  render(){
    const testStore = this.props.testStore;
    const {v1,v2,v3,setV1,setV2} = testStore;
    return(
      <div>
      <h1>Test:v1:{v1},v2:{v2},v3:{v3}</h1>
      <button onClick={setV1}>setV1</button>
      <button onClick={setV2}>setV2</button>
      </div>
    )
  }
}
  

export default Test;