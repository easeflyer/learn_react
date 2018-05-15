/**
 * 案例分析
 * 
 * 注意本案例主要是 ListView 的使用方法。
 * 其中 genData 函数模拟的多行数据。模拟的是实际使用的数据。交给 DataSource
 * Data json 数据配合显示输出。循环使用。
 * 
 * 理解重点：
 * 
 * 1) 注意listview 的高度。
 * 2）注意 ListView 有两种类型的滚动容器
 * 局部 div 容器
 *      默认，注意：需要手动给 ListView 设置高度
 * html 的 body 容器
 *      设置useBodyScroll后生效 (不需要设置高度)
 */


/* eslint no-dupe-keys: 0, no-mixed-operators: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd-mobile/dist/antd-mobile.css';
import { ListView } from 'antd-mobile';


// 主体部分，注意这个组件的所有子组件 渲染到 props.children
function MyBody(props) {
    return (
        <div className="am-list-body my-body">
            <span style={{ display: '' }}>mybody，主体部分</span>
            {props.children} {/* 注意这里 才是 ListView 的主体部分 */}
        <br />
        </div>
    );
}
// JSON 数据 数据只有3条
const data = [
    {
        img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
        title: 'Meet hotel',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
    {
        img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
        title: 'McDonald\'s invites you',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
    {
        img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
        title: 'Eat the week',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
];


const NUM_SECTIONS = 5;         // 共有5组数据
const NUM_ROWS_PER_SECTION = 5; // 每组数据的个数
let pageIndex = 0;              // 页码

const dataBlobs = {};           // 这三个数据是 dataSource 需要的参数
let sectionIDs = [];
let rowIDs = [];

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
function genData(pIndex = 0) {
    for (let i = 0; i < NUM_SECTIONS; i++) {    // 0-4 生成 5组数据
        const ii = (pIndex * NUM_SECTIONS) + i; // ii 是组编码，第2页 第1组：2*5 + 1
        const sectionName = `Section ${ii}`;   // Section 0  第0组
        sectionIDs.push(sectionName);           // 组id 用 Section 0 这样的格式。
        dataBlobs[sectionName] = sectionName;   // 把 组数据 加入 dataBlobs
        rowIDs[ii] = [];                        // 第ii组 的所有id 初始化为数组

        for (let jj = 0; jj < NUM_ROWS_PER_SECTION; jj++) { // 每组有 5 条数据
            const rowName = `S${ii}, R${jj}`;  // 模拟一条数据：S0 R0 第0组 第0行
            rowIDs[ii].push(rowName);           // 压入 rowIDs
            dataBlobs[rowName] = rowName;       // 数据也用这个模拟的数据。
        }
    }
    sectionIDs = [...sectionIDs]; // 重新复制数组 给自己，避免引用原来的存储空间。
    rowIDs = [...rowIDs];
    console.log(sectionIDs);
    console.log(rowIDs);
    console.log("dataBlobs:"+JSON.stringify(dataBlobs));
}

/**
 * dataSource 的使用。
 */
//genData();
class Demo extends React.Component {
    constructor(props) {
        super(props);
        // 获得分组数据 根据分组的索引，获得分组值
        const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
        //genData();console.log(getSectionData(dataBlobs,'Section 1'));
        // 获得行数据 根据 行索引，获取值,通过 rowID 已经可以获得行数据，因此 sectionID 没用到
        const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];
        //console.log(getRowData(dataBlobs,'Section 1','S1, R2'));
        // 数据源  dataSource 实例化
        // 这里实例化，这是提供了 4个回调函数，对于默认的数据格式做处理，如面提供的数据
        const dataSource = new ListView.DataSource({
            getRowData,
            getSectionHeaderData: getSectionData,
            rowHasChanged: (row1, row2) => row1 !== row2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
        });
        // state 状态数据：数据源，
        this.state = {
            dataSource,
            isLoading: true,
            //height: document.documentElement.clientHeight * 3 / 4,
            height: 1000,
        };
    }
    // 主要用于 第一次获取数据
    componentDidMount() {
        // you can scroll to the specified position
        // setTimeout(() => this.lv.scrollTo(0, 120), 800);
        // document.documentElement.clientHeight 可见区域的高度
        // this.lv 就是对 listview 组件的 ref 引用也就是dom引用
        // 得出 listview 的高度 hei 为 listview 屏幕高度 - list当前位置的偏移量。也就是说 listview 的高度减去了顶部的高度。
        console.log("height:"+document.documentElement.clientHeight);
        console.log("offset:"+ReactDOM.findDOMNode(this.lv).offsetTop)
        //const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).parentNode.offsetTop;
        const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).offsetTop;
        // simulate initial Ajax 这里是模拟一下 ajax 加载过程。因此延迟0.6秒执行 getData
        setTimeout(() => {
            genData(); // 获取数据到 sectionIDs,rowIDs 模块区变量存储，然后修改 state 重新渲染
            this.setState({
                // cloneWithRows flatlist 等新版本组件，这里 ant 仍然用 dataSource，调用 
                dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlobs, sectionIDs, rowIDs),
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
                dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlobs, sectionIDs, rowIDs),
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
        // 数据下标 从0开始，dada数据是为了输出内容。实际上 genData 里面的才是真实数据。
        let index = data.length - 1;
        // 定义 行组件,也就是 一个数据行。
        const row = (rowData, sectionID, rowID) => {
            console.log('rowData:'+rowData)
            if (index < 0) {
                index = data.length - 1; // 重置行下标 循环使用 data 数据。
            }
            const obj = data[index--]; // 先获得当前行数据，然后index-1
            return (// 红色边框 是一行数据
                <div key={rowID} style={{ border:'1px solid #FF0000', padding: '0 15px' }}>
                    {/* 标题栏，下方是分割线---- */}
                    <div
                        style={{
                            lineHeight: '50px',
                            color: '#888',
                            fontSize: 18,
                            borderBottom: '1px solid #F6F6F6',
                        }}
                    >{obj.title}</div>
                    {/*-webkit-box 自适应布局*/}
                    <div style={{ border:'1px solid #00FF00', display: '-webkit-box', display: 'flex', padding: '15px 0' }}>
                        <img style={{ height: '64px', marginRight: '15px' }} src={obj.img} alt="" />
                        <div style={{ lineHeight: 1 }}>
                            <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>{obj.des}</div>
                            <div><span style={{ fontSize: '30px', color: '#FF6E27' }}>35</span>¥ {rowID}</div>
                        </div>
                    </div>
                </div>
            );
        };

        return (
            //ref 回调函数，回调函数的参数就是 这个组件的 Dom 引用
            <ListView
                ref={el => this.lv = el}
                dataSource={this.state.dataSource}
                renderHeader={() => <span>header(ListView_1)</span>}
                renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
                    {this.state.isLoading ? 'Loading...' : 'Loaded'}
                </div>)}
                renderSectionHeader={sectionData => (
                    <div>{`Task ${sectionData.split(' ')[1]}`}</div>
                )}
                renderBodyComponent={() => <MyBody />} // MyBody 是Body的wrap
                renderRow={row}
                renderSeparator={separator}
                // 注意这里没有 useBodyScroll，因为我们自己设定了 listview 的高度
                style={{
                    height: this.state.height,
                    overflow: 'auto',
                }}
                pageSize={4}
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
            <div style={{height:'100px'}}>header1...........</div>
            <Demo />
        </div>
    )
}




ReactDOM.render(<App />, document.getElementById('root'));