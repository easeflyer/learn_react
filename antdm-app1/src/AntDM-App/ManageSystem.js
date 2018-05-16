import React from 'react';
import ReactDOM from 'react-dom';
import StaffHeader from './StaffHeader.js';
import StaffItemPanel from './StaffItemPanel.js';
//import { Flex } from 'antd-mobile';
//import StaffFooter from './StaffFooter.js';
//import StaffDetail from './StaffDetail.js';

import Staff from './STAFF.js';


class App extends React.Component {
	constructor() {
		super();
		this.state = {
			staff: new Staff(),
			frame: {},
			staffDetail: null
		};
	}
	filtStaff = (filtType) => {
		alert(1111);
		// console.log('this.state.staff');
		// console.log(this.state.staff);
		this.setState({
			staff: this.state.staff.filtStaff(filtType)
		});
		console.log('this.state.staff...');
		console.log(this.state.staff);		
	}
	render() {
		return (
			<div>
				<StaffHeader filtStaff={this.filtStaff} />
				<StaffItemPanel staff={this.state.staff} />
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('root'));