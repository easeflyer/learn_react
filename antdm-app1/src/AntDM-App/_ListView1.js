/* eslint no-dupe-keys: 0 */
// 经过本案例测试 listview 显示数据。只要有正确的 dataSource 就可以渲染。
import React from 'react';
import ReactDOM from 'react-dom';
import { ListView,Flex } from 'antd-mobile';

let data = {
    0:{'aa':'111','bb':'222','cc':'333','dd':'444'},
    1:{'aa':'111','bb':'222','cc':'333','dd':'444'},
    2:{'aa':'111','bb':'222','cc':'333','dd':'444'},
    3:{'aa':'111','bb':'222','cc':'333','dd':'444'},
    4:{'aa':'111','bb':'222','cc':'333','dd':'444'},
    5:{'aa':'111','bb':'222','cc':'333','dd':'444'},
}

let dataSource = new ListView.DataSource({
    rowHasChanged: (row1, row2) => row1 !== row2,
});

dataSource = dataSource.cloneWithRows(data);
let row = (rowData, sectionID, rowID) => {
    return (
        <Flex style={{ 'padding': '50px 10px', 'borderBottom': '1px solid #cccccc' }}>
            <Flex.Item>{rowData.aa}</Flex.Item>
            <Flex.Item>{rowData.bb}</Flex.Item>
            <Flex.Item>{rowData.cc}</Flex.Item>
            <Flex.Item>{rowData.dd}</Flex.Item>
            <Flex.Item onClick={this.handleClick}> 删除 详情</Flex.Item>
        </Flex>
    );
};
console.log('datasource');
console.log(dataSource);

const lv = (
<ListView
    dataSource={dataSource}
    //renderHeader={}
    renderFooter={() => (<div style={{ padding: 10, textAlign: 'center' }}>
        {'Loading...'}
    </div>)}
    renderRow={row}
    //renderSeparator={separator}
    className="am-list"
    pageSize={5}

    useBodyScroll
    onScroll={() => { console.log('scroll'); }}
    scrollRenderAheadDistance={500}  // 当一个行接近屏幕范围多少像素之内的时候，就开始渲染这一行
    //onEndReached={this.onEndReached}
    //onEndReachedThreshold={10}  // 	调用onEndReached之前的临界值，单位是像素

/>
);
ReactDOM.render(lv, document.getElementById('root'));