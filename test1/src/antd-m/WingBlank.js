import React from 'react';
import ReactDOM from 'react-dom';
import 'antd-mobile/dist/antd-mobile.css'; 
import './WingBlank.css'
import { WingBlank, WhiteSpace } from 'antd-mobile';


/**
 * 两翼留白 布局。
 * 注意 restProps 的使用。
 * 
 */
const PlaceHolder = ({ className = '', ...restProps }) => (
  <div className={`${className} placeholder`} {...restProps}>Block{restProps['text']}</div>
);

const WingBlankExample = () => (
  <div style={{ padding: '15px 0' }}>
    <WingBlank><PlaceHolder text='普通' /></WingBlank>

    <WhiteSpace size="lg" />
    <WingBlank size="md"><PlaceHolder text='中等' /></WingBlank>

    <WhiteSpace size="lg" />
    <WingBlank size="sm"><PlaceHolder text='较小' /></WingBlank>
  </div>
);

ReactDOM.render(<WingBlankExample />, document.getElementById('root'));