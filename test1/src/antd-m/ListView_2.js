/**
 * 案例分析
 * 
 * 注意本案例主要是 ListView 的使用方法。
 * 其中 genData 函数模拟的多行数据。模拟的是实际使用的数据。交给 DataSource
 * Data json 数据配合显示输出。循环使用。
 */


/* eslint no-dupe-keys: 0, no-mixed-operators: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd-mobile/dist/antd-mobile.css';
import { ListView } from 'antd-mobile';


// 主体部分，注意这个组件的所有子组件 渲染到 props.children
// function MyBody(props) {
//     return (
//         <div className="am-list-body my-body">
//             <span style={{ display: '' }}>mybody，主体部分</span>
//             {props.children}
//         </div>
//     );
// }
function MyBody(props) {
    return (
        <table>
            {props.children}
        </table>
    );
}
// JSON 数据 数据只有3条
const dataBlobs = {};           // 这三个数据是 dataSource 需要的参数
//let sectionIDs = [];
let rowIDs = [];
function genData(pIndex){
    let rowID = '';
    for (var i = 0; i < 10; i++) {
        rowID = `row${pIndex * 10 + i}`;
        rowIDs.push(rowID);
        //dataBlobs[rowID] = 'rowID...';
        dataBlobs[rowID] = {};
        for (var j = 0; j < 5; j++) {
            dataBlobs[rowID][`col${j}`] = `${rowID}-col${j}`;
        }
    }
    console.log("rowIDs:" + rowIDs);
    console.log("dataBlobs:" + JSON.stringify(dataBlobs));
}
/*
{ row0: [ 'col0', 'col1', 'col2', 'col3', 'col4' ],
  row1: [ 'col0', 'col1', 'col2', 'col3', 'col4' ],
...
  row19: [ 'col0', 'col1', 'col2', 'col3', 'col4' ] }
*/

//const NUM_SECTIONS = 5;         // 共有5组数据
//const NUM_ROWS_PER_SECTION = 5; // 每组数据的个数
let pageIndex = 0;              // 页码



/**
 * 获取数据
 * @param {*} pIndex 页码，每次重新加载数据 页码加1
 * 返回：
 *  dataBlobs   这里提供所有行数据，包含 section行
 * 注意 genData 只是模拟的多行数据。注意参考数据的格式。这个数据会交给 DataSource 使用。
 * 
 * 
 *      "Section 0":"Section 0",
        "S0, R0":"S0, R0",
        "S0, R1":"S0, R1",
        "S0, R2":"S0, R2",
        "S0, R3":"S0, R3",
        "S0, R4":"S0, R4",
 *  sectionIDs  这里提供所有的 section行的id
        0:"Section 0"
        1:"Section 1"
        2:"Section 2"
        3:"Section 3"
        4:"Section 4" 
 *  rowIDs  记录了 所有 section 的行,每一个 section 包含那些 id
        0:(5) ["S0, R0", "S0, R1", "S0, R2", "S0, R3", "S0, R4"]
        1:(5) ["S1, R0", "S1, R1", "S1, R2", "S1, R3", "S1, R4"]
        2:(5) ["S2, R0", "S2, R1", "S2, R2", "S2, R3", "S2, R4"]
        3:(5) ["S3, R0", "S3, R1", "S3, R2", "S3, R3", "S3, R4"]
        4:(5) ["S4, R0", "S4, R1", "S4, R2", "S4, R3", "S4, R4"]
 */

/**
 * dataSource 的使用。
 */
//genData();
class Demo extends React.Component {
    constructor(props) {
        super(props);
        //const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];
        //const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];
        //console.log(getRowData(dataBlobs,'Section 1','S1, R2'));
        // 数据源  dataSource 实例化
        // 这里实例化，这是提供了 4个回调函数，对于默认的数据格式做处理，如面提供的数据
        const dataSource = new ListView.DataSource({
            //getRowData,  // 这个例子之前出问题，主要原因就在于这个地方。没有获得RowData。
            //getSectionHeaderData: getSectionData,
            rowHasChanged: (row1, row2) => row1 !== row2,
            //sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
        });
        // state 状态数据：数据源，
        this.state = {
            dataSource,
            isLoading: true,
            height: document.documentElement.clientHeight * 3 / 4,
        };
    }
    // 主要用于 第一次获取数据
    componentDidMount() {
        // you can scroll to the specified position
        // setTimeout(() => this.lv.scrollTo(0, 120), 800);
        // document.documentElement.clientHeight 可见区域的高度
        // this.lv 就是对 listview 组件的 ref 引用也就是dom引用
        // 得出 listview 的高度 hei 为 listview 屏幕高度 - list当前位置的偏移量。也就是说 listview 的高度减去了顶部的高度。
        const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).parentNode.offsetTop;
        // simulate initial Ajax 这里是模拟一下 ajax 加载过程。因此延迟0.6秒执行 getData
        setTimeout(() => {
            genData(0); // 获取数据到 sectionIDs,rowIDs 模块区变量存储，然后修改 state 重新渲染
            this.setState({
                // cloneWithRows flatlist 等新版本组件，这里 ant 仍然用 dataSource，调用 
                dataSource: this.state.dataSource.cloneWithRows(dataBlobs, rowIDs),
                isLoading: false,
                height: hei,
            });
        }, 600);
    }

    // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
    // componentWillReceiveProps(nextProps) {
    //   if (nextProps.dataSource !== this.props.dataSource) {
    //     this.setState({
    //       dataSource: this.state.dataSource.cloneWithRowsAndSections(nextProps.dataSource),
    //     });
    //   }
    // }

    // 当滑动到底部时 加载新的数据，延迟1000ms 模拟 ajax 加载
    // 这种语法 避免了 构造函数里 bind(this)
    onEndReached = (event) => {
        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false
        // 如果没有更多数据了，则直接返回。
        if (this.state.isLoading && !this.state.hasMore) {
            return;
        }
        console.log('reach end', event);
        this.setState({ isLoading: true });
        setTimeout(() => {
            genData(++pageIndex); // 这条语句更新了 数据来源的所有数据。
            this.setState({
                // 通过调用 cloneWithRowsAndSections 更新数据源，并支持 数据分组 section
                dataSource: this.state.dataSource.cloneWithRows(dataBlobs, rowIDs),
                isLoading: false,
            });
        }, 1000);
    }

    // Demo 的 渲染函数
    render() {
        // 分隔符 separator 是列表中间的空白区域。 也就是 列表的分隔符
        const separator = (sectionID, rowID) => (
            // 再 `` 中可以直接用 模板变量
            <div
                key={`${sectionID}-${rowID}`}
                style={{
                    backgroundColor: '#F5F5F9',
                    height: 8,
                    borderTop: '1px solid #ECECED',
                    borderBottom: '1px solid #ECECED',
                }}
            />
        );
        const row = (rowData, sectionID, rowID) => {
            return (
                <tr>
                    <td>{rowData['col0']}</td><td>{rowData['col0']}</td><td>{rowData['col0']}</td><td>{rowData['col0']}</td>
                </tr>
            );
        };

        return (
            //ref 回调函数，回调函数的参数就是 这个组件的 Dom 引用
            <ListView
                ref={el => this.lv = el}
                dataSource={this.state.dataSource}
                renderHeader={() => <span>header</span>}
                renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
                    {this.state.isLoading ? 'Loading...' : 'Loaded'}
                </div>)}
                renderBodyComponent={() => <MyBody />}
                renderRow={row}
                //renderSeparator={separator}
                style={{
                    height: this.state.height,
                    overflow: 'auto',
                }}
                pageSize={10}
                onScroll={() => { console.log('scroll'); }} // 会被触发。
                scrollRenderAheadDistance={500}             // 拖拽多远的距离触发事件
                onEndReached={this.onEndReached}
                onEndReachedThreshold={10}
            />
        );
    }
}
// 注意这里 箭头函数 后面没有大括号。
const App = () => {
    return (
        <div>
            <div>header1...........</div>
            <Demo />
        </div>
    )
}




ReactDOM.render(<App />, document.getElementById('root'));