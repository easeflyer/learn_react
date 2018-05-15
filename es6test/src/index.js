import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Demo,Welcome} from './module/mb'

ReactDOM.render(<App />, document.getElementById('root'));
//ReactDOM.render(<Demo />, document.getElementById('demo'));
ReactDOM.render(<Welcome name="ease" />, document.getElementById('welcome'));



registerServiceWorker();
