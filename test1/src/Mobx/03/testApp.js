import React from 'react'
import ReactDOM from 'react-dom'
import { observable, action } from 'mobx';
import {observer} from 'mobx-react'


class AppStore{
  @observable aa = 1;
  @observable bb = 1;
  @action.bound
  toggle(){
    this.aa = 2;
  }
}

@observer
class Ca extends React.Component {
  render() {
    console.log('...ca:ca');
    return (
      <h1>Ca:{this.props.aa.aa}</h1>
    );
  }
}
@observer
class Cb extends React.Component {
  render() {
    console.log('...cb:cb');
    return (
      <h1>Cb:{this.props.bb.bb}</h1>
    );
  }
}


@observer
class App extends React.Component {
  render() {
    console.log('..app');
    return (
      <div>
        <Ca aa={this.props.store} />
        <Cb bb={this.props.store} />
        <button onClick={this.props.store.toggle}>点击</button>
      </div>
    );
  }
}

const app = <App store={new AppStore()} />

ReactDOM.render(app, document.getElementById('root'));