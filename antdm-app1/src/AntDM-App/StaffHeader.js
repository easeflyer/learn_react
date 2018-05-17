import React from 'react';
import { NavBar, Menu, Icon } from 'antd-mobile';
import QueueAnim from 'rc-queue-anim';
import './style.css'
export default class StaffHeader extends React.Component {
	constructor() {
		super();
		this.state = {
			filtshow: false,
			sortshow: false
		}
	}
	handleFiltClick = (e) => {
		e.preventDefault();
		//alert(333);
		this.setState({
			filtshow: !this.state.filtshow,
			sortshow: false, // 另外一个菜单设置 隐藏
		});
	}
	handleSortClick = (e) => {
		e.preventDefault();
		//alert(333);
		this.setState({
			sortshow: !this.state.sortshow,
			filtshow: false,
		});
	}
	handleFiltChange = (value) => {
		//alert(value);
		this.props.filtStaff(value);
		this.setState({
			filtshow: false
		});
		//filtType = 


	}
	handleSortChange = (value) => {
		this.props.sortStaff(value);
		this.setState({
			sortshow: false
		});
		//filtType = 

	}
	onMaskClick = () => {
		this.setState({
			filtshow: false,
			sortshow: false
		});
	}
	render() {
		const data = [
			{ value: '0', label: '全部' },
			{ value: '1', label: '主任' },
			{ value: '2', label: '老师' },
			{ value: '3', label: '学生' },
			{ value: '4', label: '实习' }
		];
		const filtMenu = (
			<Menu
				// ref={(el)=>this.el = el} // 把 自己传递给对象，然后可以设置 默认值
				className="foo-menu"
				data={data}
				//value={['1']}
				level={1}
				onChange={this.handleFiltChange}
			//height={document.documentElement.clientHeight * 0.6}
			/>
		);
		const data1 = [
			{ value: '0', label: '身份' },
			{ value: '1', label: '年龄升' },
			{ value: '2', label: '年龄降' },

		];
		const sortMenu = (
			<QueueAnim className="queue-simple">
				<Menu key='1'
					className="foo-menu"
					data={data1}
					//value={['1']}
					level={1}
					style={{ marginLeft: '30px' }}
					onChange={this.handleSortChange}
				//height={document.documentElement.clientHeight * 0.6}
				/>
			</QueueAnim>
		);
		//const sortMenu = ();
		const leftMenu = (
			<div>
				<span style={{ paddingLeft: '0px' }} onClick={this.handleFiltClick}>筛选</span>
				<span style={{ paddingLeft: '15px' }} onClick={this.handleSortClick}>排序</span>
			</div>
		);


		return (

			<div className={this.state.show ? 'menu-active' : ''}>
				<NavBar
					mode="dark"
					leftContent={leftMenu}
					//onLeftClick={this.handleLeftClick}
					className="top-nav-bar"
					rightContent={[
						<Icon key="0" type="search" style={{ marginRight: '16px' }} />,
						<Icon key="1" type="ellipsis" />,
					]}
				>NavBar</NavBar>
				{this.state.filtshow ? filtMenu : null}
				{this.state.sortshow ? sortMenu : null}
				{this.state.sortshow || this.state.filtshow ? <div className="menu-mask" onClick={this.onMaskClick} /> : null}
			</div>
		);
	}
}
