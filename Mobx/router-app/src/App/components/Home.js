import { withRouter } from 'react-router-dom';
import React from 'react';
import { inject, observer } from 'mobx-react';

@inject('commonStore')
@withRouter
@observer
class Home extends React.Component {
  render(){
    const {v1,v2} = this.props.commonStore;
    return(
      <h1>Home:v1:{v1},v2:{v2}</h1>
    )
  }
}
  

export default Home;