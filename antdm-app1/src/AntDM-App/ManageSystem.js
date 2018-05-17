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
			staffDetail: null
		};
	}
	filtStaff = (filtType) => {
		this.setState({
			staff: this.state.staff.filtStaff(filtType)
		});
	}
	sortStaff = (filtType) => {
		this.setState({
			staff: this.state.staff.sortStaff(filtType)
		});
	}
	render() {
		return (
			<div>
				<StaffHeader sortStaff={this.sortStaff} filtStaff={this.filtStaff} />
				<StaffItemPanel staff={this.state.staff} />
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('root'));