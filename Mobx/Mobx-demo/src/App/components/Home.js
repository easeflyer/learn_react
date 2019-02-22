import { withRouter } from 'react-router-dom';
import React from 'react';
import { inject, observer } from 'mobx-react';
// import commonStore from './App/stores/commonStore';


// const Home1 = observer(({...commonStore})=> <Home v1=v1 /> )

// const com = inject("commonStore")(
//   ({commonStore}) =>{
//     const {v1,v2} = this.props.commonStore;

//   }
// ) @inject('v1')
//@inject('commonStore')
// class Home1 extends React.Component{
//   render(){
//     return <Home v1 = {this.props.v1} />
//   }
// }


@inject(stores=>({v1:stores.commonStore.v1,v2:stores.commonStore.v2}))
@withRouter
@observer
class Home extends React.Component {
  render(){
    //const {v1,v2} = this.props.commonStore;
    const v1 = this.props.v1;
    const v2 = this.props.v2;
    return(
      <div>
        <h1>Home:v1:{v1},v2:{v2}</h1>
        {/* <h1>{v3}</h1> */}
      </div>
    )
  }
}


// let Home1 = inject(stores=>({v1:stores.commonStore.v1,v2:stores.commonStore.v2}))(observer(Home))



  

export default Home;