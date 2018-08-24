import React from 'react'
import ReactDOM from 'react-dom'


class App extends React.Component{
    componentDidMount(){
        const { value } = this.context;
        //console.log(value)
    }
    render(){
        const { value } = this.context;
        console.log(value)
        return(
            <Consumer>
                {value => <h1>{value.aa}</h1>}
            </Consumer>
        );
    }
}

const {Provider,Consumer} = React.createContext('111')
const store = {aa:12,bb:22}

ReactDOM.render(
    <Provider value={store}>
        <App />
    </Provider>
,document.getElementById('root')
);