import React from 'react';
import ReactDOM from 'react-dom';
//import '../index.less';
import { Icon, Button } from 'antd';
import '../../node_modules/antd/dist/antd.css'

const Demo = ()=>(
    <div>
<Icon type="up-circle-o" />
<Icon type="up" />
<Icon type="check" />
<Icon type="credit-card" />
</div>
);

ReactDOM.render(<Demo />, document.getElementById('root'));