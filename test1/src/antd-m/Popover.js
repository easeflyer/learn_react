import React from 'react';
import ReactDOM from 'react-dom';
import 'antd-mobile/dist/antd-mobile.css';
import { Popover, NavBar, Icon } from 'antd-mobile';

/**
 * 泡泡 Popover 案例
 * 学习重点：
 * Popover.Item 也就是每个选项如何构造，以及选择后的事件处理。
 * 泡泡自身的 定位，遮罩，以及泡泡标签中间的内容。
 */



const Item = Popover.Item;

// 定义图片组件
const myImg = src => <img src={`https://gw.alipayobjects.com/zos/rmsportal/${src}.svg`} className="am-icon am-icon-xs" alt="" />;

class App extends React.Component {
  state = {
    visible: true,
    selected: '',
  };
  onSelect = (opt) => {
    console.log(opt.props.value);  // 这里是对选中 某个 Item 后的处理。opt.props.value 就是被选中的 item 的 value
    this.setState({
      visible: false, // 点选之后，泡泡消失
      selected: opt.props.value,
    });
  };
  handleVisibleChange = (visible) => {
    this.setState({
      visible,
    });
  };
  render() {
    return (<div>
      <NavBar
        mode="light" // 白色 导航条
        rightContent={ // 右侧内容为 Popover 组件
          <Popover mask // mask 模态遮罩
            overlayClassName="fortest"  // 弹出层的 样式名称
            overlayStyle={{ color: 'currentColor' }} // 上面的是 class 值，这里是 style 的值
            visible={this.state.visible}
            overlay={[ // 弹出层的内容
              (<Item key="4" value="scan" icon={myImg('tOtXhkIWzwotgGSeptou')} data-seed="logId">Scan</Item>),
              (<Item key="5" value="special" icon={myImg('PKAgAqZWJVNwKsAJSmXd')} style={{ whiteSpace: 'nowrap' }}>My Qrcode</Item>),
              (<Item key="6" value="button ct" icon={myImg('uQIYTFeRrjPELImDRrPt')}>
                <span style={{ marginRight: 5 }}>Help</span>
              </Item>),
            ]}
            align={{ // 位置。
              overflow: { adjustY: 0, adjustX: 0 },
              offset: [-10, 0], // 这个是定位偏移量，相对于 上层div 应该是 屏幕可见区域。
            }}
            onVisibleChange={this.handleVisibleChange}
            onSelect={this.onSelect}
          > 
            <div style={{ // 注意 泡泡标签 中间是一个 div 显示为 三个圆点。
              height: '100%',
              padding: '0 15px',  // 这里的样式是为了给圆点 一个高度和 边距。控制泡泡的位置。
              marginRight: '-15px',
              display: 'flex',
              alignItems: 'center',
            }}
            >
              <Icon type="ellipsis" />
            </div>
          </Popover>
        }
      >
        NavBar
      </NavBar>
    </div>);
  }
}

ReactDOM.render(<App />, document.getElementById('root'));