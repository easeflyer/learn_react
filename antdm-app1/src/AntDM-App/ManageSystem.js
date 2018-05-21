import React from 'react';
import ReactDOM from 'react-dom';
import StaffHeader from './StaffHeader.js';
import StaffSearch from './StaffSearch.js';
import StaffDetail from './StaffDetail.js';
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
			staffSearch: null,
			staffDetail: null,
		};
	}
	search = (value) => {
		this.setState({
			staff: this.state.staff.search(value)
		});
	}
	searchStaff = () => {
		this.setState({
			staffSearch: !this.state.staffSearch
		});
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
	handleOnDel = (id) => {
		//alert(id);
		this.setState({
			staff: this.state.staff.delStaff(id)
		});
	}
	handleOnDetail = (id) => {
		this.setState({
			staffDetail: { id, rData: this.state.staff.rData[id] }
		});

	}
	handleCloseDetail = () => {
		//alert('22222222222222')
		console.log('this.state.staff');
		console.log(this.state.staff);
		this.setState({
			staffDetail: null,
			//staff: this.state.staff
		});
	}
	handleEditDetail = (item) => {
		console.log('this.state.staff11..........');
		console.log(this.state.staff.rData[0].age); // 这样输出是正常的。
		//console.log(this.state.staff);  // 注意在这里如果输出对象，则会输出新数据。貌似是一个浏览器bug.
		alert(333);
		this.setState({
			staff: this.state.staff.editStaffItem(item)
		});
		console.log('this.state.staff22.........');
		console.log(this.state.staff.rData);

	}
	render() {
		return (
			<div>
				{this.state.staffSearch ? <StaffSearch searchStaff={this.searchStaff} search={this.search} /> : null}
				<StaffHeader sortStaff={this.sortStaff} filtStaff={this.filtStaff} searchStaff={this.searchStaff} />
				<StaffItemPanel staff={this.state.staff} onDel={this.handleOnDel} onDetail={this.handleOnDetail} />
				<StaffDetail staffDetail={this.state.staffDetail} closeDetail={this.handleCloseDetail} editDetail={this.handleEditDetail} />
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('root'));