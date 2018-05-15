import React from 'react';
import ReactDOM from 'react-dom';
import 'antd-mobile/dist/antd-mobile.css';
import { Tabs, WhiteSpace, Badge } from 'antd-mobile';

/**
 * Tabs 标签页
 * 标签的使用，可以是文本，可以是 Badge 这样的 红色圆点提示样式。
 * 标签页的内容。和标签数量匹配即可。
 */


const tabs = [ // 注意 title 属性是一个 Badge 组件
  { title: <Badge text={'3'}>First Tab</Badge> },           // 红色圆点里面显示数字3。
  { title: <Badge text={'今日(20)'}>Second Tab</Badge> },    // 显示文字。
  { title: <Badge dot>Third Tab</Badge> },                  // 红色圆点
];

const tabs2 = [ // title 属性是纯文字
  { title: 'First Tab', sub: '1' },
  { title: 'Second Tab', sub: '2' },
  { title: 'Third Tab', sub: '3' },
];

const TabExample = () => (
  <div>
    <Tabs tabs={tabs}
      initialPage={1}
      onChange={(tab, index) => { console.log('onChange', index, tab); }}
      onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
        Content of first tab
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
        Content of second tab
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
        Content of third tab
      </div>
    </Tabs>
    <WhiteSpace />{/* 两个Tabs 中间的留白 分割*/}
    <Tabs tabs={tabs2}  // 这里应该只是得到了数组
      initialPage={1}
      tabBarPosition="bottom"  // 标签 定位在底部
      renderTab={tab => <span>{tab.title}</span>} // 这里用来 确定渲染的样式
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
        Content of first tab
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
        Content of second tab
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
        Content of third tab
      </div>
    </Tabs>
    <WhiteSpace />
  </div>
);

ReactDOM.render(<TabExample />, document.getElementById('root'));