import React from 'react';
import ReactDOM from 'react-dom';
import * as mm from './modules'

const App = () => {
    console.log(mm);
    return(
        <div>
            aa:{mm.aa}
            bb:{mm.bb}
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));