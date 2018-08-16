import React from 'react'
import ReactDOM from 'react-dom'
// import { createStore } from 'redux'
// import Counter from './components/Counter'
// import counter from './reducers'


const { Provider, Consumer } = React.createContext('默认值');

class App extends React.Component{
    constructor(props,context){
        super(props)
        console.log(this.props)
        console.log(context)
    }
    render(){
        console.log(this.context)
        return(
            <Consumer>
                {store => <div>
                    store:{store}
                </div>}
            </Consumer>
        );
    }
}
//const store = {'p1':1,'p2':2,'p3':3}
const store = 'ssss';


ReactDOM.render(
    <Provider value={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)