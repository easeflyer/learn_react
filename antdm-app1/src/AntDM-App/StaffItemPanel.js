import React from 'react';
import ReactDOM from 'react-dom';
import { ListView, Flex } from 'antd-mobile';
import QueueAnim from 'rc-queue-anim';
import '../../node_modules/antd-mobile/dist/antd-mobile.css'
class StaffItemPanel extends React.Component {
	constructor(props) {
		super(props);
		let dataSource = new ListView.DataSource({
			rowHasChanged: (row1, row2) => row1 !== row2,
		});
		this.pIndex = 0;
		console.log('this.props.staff.staff')
		console.log(this.props.staff.staff)
		
		this.state = {
			dataSource,  // dataSource:dataSource,
			//height:document.documentElement.clientHeight * 3 / 4,
		};
		this.state.dataSource = dataSource.cloneWithRows(this.props.staff.staff);
		console.log('dataSource....');
		console.log(this.state.dataSource);
	}
	onEndReached = (event) => {
		console.log('reach end', event);
		setTimeout(() => {
			const dataBlobs = this.props.staff.genData(++this.pIndex); // 这条语句更新了 数据来源的所有数据。
			this.props.staff.staff = {...this.props.staff.staff,...dataBlobs}
			this.setState({
				// 通过调用 cloneWithRowsAndSections 更新数据源，并支持 数据分组 section
				dataSource: this.state.dataSource.cloneWithRows(this.props.staff.staff)
				//isLoading: false,
			});
			//alert(2323);
		}, 1000)
	}
	// 在这里对数据进行初始化
	componentDidMount() {
		// 计算 listview  的高度。 让 listview  保持顶部和 header 对其。
		const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).offsetTop;
		this.setState({
			//dataSource: this.state.dataSource.cloneWithRows(this.props.staff.staff),
			height: hei
		});
	}
	render() {
		this.state.dataSource = this.state.dataSource.cloneWithRows(this.props.staff.staff);
		let row = (rowData, sectionID, rowID) => {
			return (
				<QueueAnim delay={500} className="queue-simple">
				<Flex key={rowData.id} style={{ 'padding': '50px 10px', 'borderBottom': '1px solid #cccccc' }}>
					<Flex.Item>{rowData.name}</Flex.Item>
					<Flex.Item>{rowData.sex}</Flex.Item>
					<Flex.Item>{rowData.age}</Flex.Item>
					<Flex.Item>{rowData.id}</Flex.Item>
					<Flex.Item onClick={this.handleClick}> 删除 详情</Flex.Item>
				</Flex>
				</QueueAnim>
			);
		};
		return (
			<div>
				<div>
					<Flex style={{ height: 30, padding: '5px 10px' }}>
						<Flex.Item>姓名</Flex.Item>
						<Flex.Item>性别</Flex.Item>
						<Flex.Item>年龄</Flex.Item>
						<Flex.Item>职务</Flex.Item>
						<Flex.Item>操作</Flex.Item>
					</Flex>
				</div>
				<ListView
					ref={el => this.lv = el} // this.lv 就是这个 listview
					dataSource={this.state.dataSource}
					//renderHeader={}
					renderFooter={() => (<div style={{ padding: 10, textAlign: 'center' }}>
						{'Loading...'}
					</div>)}
					renderRow={row}
					//renderSeparator={separator}
					className="am-list"
					pageSize={5}
					style={{
						height: this.state.height,
						overflow: 'auto',
					}}

					//useBodyScroll
					onScroll={() => { console.log('scroll'); }}
					scrollRenderAheadDistance={500}  // 当一个行接近屏幕范围多少像素之内的时候，就开始渲染这一行
					onEndReached={this.onEndReached}
					onEndReachedThreshold={10}  // 	调用onEndReached之前的临界值，单位是像素
				/>
			</div>
		);

	}
}

export default StaffItemPanel;