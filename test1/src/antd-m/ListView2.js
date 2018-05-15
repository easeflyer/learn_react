/* eslint no-dupe-keys: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd-mobile/dist/antd-mobile.css';
import { ListView } from 'antd-mobile';

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
const NUM_ROWS = 20;    // 每次生成 20条记录。（不触发再次获取数据）1页数据。
let pageIndex = 0;      // 当前页 0 （20条数据）

function genData(pIndex = 0) {
  const dataBlob = {};  // dataSource 可以接受的数据格式
  for (let i = 0; i < NUM_ROWS; i++) {  // 20条数据
    const ii = (pIndex * NUM_ROWS) + i; // 数据下标 根据页数进行调整
    dataBlob[`${ii}`] = `row - ${ii}`;  // '0':'row-0','1':'row-1'
  }
  console.log(dataBlob);
  return dataBlob;                      // 返回 数据字典
}

class Demo extends React.Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({ // 新建 Datasource 参数只有 rowHasChanged 函数。
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      dataSource,
      isLoading: true,
    };
  }

  componentDidMount() {
    // you can scroll to the specified position
    // setTimeout(() => this.lv.scrollTo(0, 120), 800);

    // simulate initial Ajax
    setTimeout(() => {
      this.rData = genData(); // rData 既是 '0':'row-0','1':'row-1'
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData), // 用 rData 更新 dataSource 
        isLoading: false,
      });
    }, 600);
  }

  // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.dataSource !== this.props.dataSource) {
  //     this.setState({
  //       dataSource: this.state.dataSource.cloneWithRows(nextProps.dataSource),
  //     });
  //   }
  // }

  onEndReached = (event) => {
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    if (this.state.isLoading && !this.state.hasMore) {
      return;
    }
    console.log('reach end', event);
    this.setState({ isLoading: true });
    setTimeout(() => {
      this.rData = { ...this.rData, ...genData(++pageIndex) };
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        isLoading: false,
      });
    }, 1000);
  }

  render() {
    const separator = (sectionID, rowID) => (
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
    let index = data.length - 1;
    const row = (rowData, sectionID, rowID) => {
       // console.log("rowData【"+rowData);
      if (index < 0) {
        index = data.length - 1;
      }
      const obj = data[index--];
      return (
        <div key={rowID} style={{ padding: '0 15px' }}>
          <div
            style={{
              lineHeight: '50px',
              color: '#888',
              fontSize: 18,
              borderBottom: '1px solid #F6F6F6',
            }}
          >{obj.title}</div>
          <div style={{ display: '-webkit-box', display: 'flex', padding: '15px 0' }}>
            <img style={{ height: '64px', marginRight: '15px' }} src={obj.img} alt="" />
            <div style={{ lineHeight: 1 }}>
              <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>{obj.des}</div>
              <div><span style={{ fontSize: '30px', color: '#FF6E27' }}>{rowID}</span>¥</div>
            </div>
          </div>
        </div>
      );
    };
    return (
      <ListView
        ref={el => this.lv = el}
        dataSource={this.state.dataSource}
        renderHeader={() => <span>header</span>}
        renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
          {this.state.isLoading ? 'Loading...' : 'Loaded'}
        </div>)}
        renderRow={row}
        renderSeparator={separator}
        className="am-list"
        pageSize={4}
        useBodyScroll
        onScroll={() => { console.log('scroll'); }}
        scrollRenderAheadDistance={500}
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