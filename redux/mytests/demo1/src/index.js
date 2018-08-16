import React from 'react'
import ReactDOM from 'react-dom'
import Counter from './components/Counter'
import { createStore } from 'redux'
import counter from './reducers'

const store = createStore(counter)
class App extends React.Component{
    render(){
        return(
            <Counter
                value={store.getState()}
                onIncrease={()=>store.dispatch({type:'INCREASE'})}
                onDecrease={()=>store.dispatch({type:'DECREASE'})}
            />
        )
    }
}

const render = () => ReactDOM.render(
    <App />,
    document.getElementById('root')
);
render()
store.subscribe(render)