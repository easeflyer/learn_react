import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import App1 from './controller/App1'
import App2 from './controller/App2'
import Model from './model/Model';

const AppCtx = React.createContext(Model);
const { Provider, Consumer } = AppCtx;

class App extends React.Component {
  render() {
    return (
      <div>
        <nav>
          <ul>
            <li><Link to="/">Homes</Link></li>
            <li><Link to="/app1">应用1</Link></li>
            <li><Link to="/app2">应用2</Link></li>
          </ul>
        </nav>
        <Consumer>
          {(Model)=>(
            <div>
            <Route path="/" exact={true} render={() => <h3>home</h3>} />
            <Route path="/app1" component={(props)=><App1 model={Model.App1Model} {...props} />} />
            <Route path="/app2" component={(props)=><App2 model={Model.App2Model} {...props} />} />
            </div>
          )}
        </Consumer>
      </div>
    )
  }
}



ReactDOM.render(
  <Provider value={Model}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'));