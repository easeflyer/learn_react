import React from 'react';
import ReactDOM from 'react-dom';
import { ListView, Flex } from 'antd-mobile';
import { Icon } from 'antd';
import QueueAnim from 'rc-queue-anim';
import '../../node_modules/antd-mobile/dist/antd-mobile.css'
import '../../node_modules/antd/dist/antd.css'
class StaffItemPanel extends React.Component {
	constructor(props) {
		super(props);
		let dataSource = new ListView.DataSource({
			rowHasChanged: (row1, row2) =>{
				console.log('row1.........');
				console.log(row1);
				console.log('row2..........');
				console.log(row2);
				
				return row1 !== row2
			},
		});
		this.pIndex = 0;
		console.log('this.props.staff.staff')
		console.log(this.props.staff.staff)

		this.state = {
			dataSource,  // dataSource:dataSource,
			//height:document.documentElement.clientHeight * 3 / 4,
		};
		console.log('constructor.........');
		this.state.dataSource = dataSource.cloneWithRows(this.props.staff.staff);
		console.log('age:::::'+this.state.dataSource._dataBlob.s1[0].age);
		console.log('dataSource....');
		console.log(this.state.dataSource);
	}
	onEndReached = (event) => {
		console.log('reach end', event);
		setTimeout(() => {
			const dataBlobs = this.props.staff.genData(++this.pIndex); // 这条语句更新了 数据来源的所有数据。
			this.props.staff.staff = { ...this.props.staff.staff, ...dataBlobs }
			console.log('onEndReached.........');
			console.log('age:::::'+this.state.dataSource._dataBlob.s1[0].age);
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
		console.log('age:::::'+this.state.dataSource._dataBlob.s1[0].age);
	}
	render() {
		// console.log('this.state.dataSource1............');
		// console.log('age:::::'+this.state.dataSource._dataBlob.s1[0].age);
		this.state.dataSource.cloneWithRows(this.props.staff.staff);
		// console.log('this.state.dataSource2............');
		// console.log(this.state.dataSource);
		let mybody = (props) => { return(
			<QueueAnim delay={200} className="queue-simple">

			{this.props.children}
			</QueueAnim>
		);}
		let row = (rowData, sectionID, rowID) => {
			return (

				<Flex key={rowID} style={{ 'padding': '50px 10px', 'borderBottom': '1px solid #cccccc' }}>
					<Flex.Item key={rowID+'col1'} onClick={()=>this.props.onDetail(rowID)} style={{color:'#0000FF'}}>{rowData.name}</Flex.Item>
					<Flex.Item key={rowID+'col2'}>{rowData.sex}</Flex.Item>
					<Flex.Item key={rowID+'col3'}>{rowData.age}</Flex.Item>
					<Flex.Item key={rowID+'col4'}>{rowData.id}</Flex.Item>
					<Flex.Item key={rowID+'col5'}>
						<Icon type="close-circle-o" style={{color:'#FF0000',fontSize:'24px'}}
							onClick={()=>this.props.onDel(rowID)}
						 />
					</Flex.Item>
				</Flex>
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
					//renderBodyComponent={mybody}
					renderSectionWrapper={mybody}
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