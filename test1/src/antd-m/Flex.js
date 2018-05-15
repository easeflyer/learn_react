import React from 'react';
import ReactDOM from 'react-dom';
import { Flex, WhiteSpace } from 'antd-mobile';
import './Flex.css'
import 'antd-mobile/dist/antd-mobile.css'; // 这一句是从哪里引入的？

/**
 * PlaceHolder（占位符） 组件
 * props 包含 className 以及 restProps 数组
 * 渲染结果：
 * <div className= 以及其他 restProps 属性
 */
const PlaceHolder = ({ className = '', ...restProps }) => (
  <div className={`${className} placeholder`} {...restProps}>Block</div>
);

const FlexExample = () => (
  <div className="flex-container">
    {/* Basic 注意 Flex 没有属性  */}
    <div className="sub-title">Basic</div>
    <Flex>
      <Flex.Item><PlaceHolder /></Flex.Item>
      <Flex.Item><PlaceHolder /></Flex.Item>
    </Flex>
    <WhiteSpace size="lg" /> {/* 空白行 */}
    <Flex>
      <Flex.Item><PlaceHolder /></Flex.Item>
      <Flex.Item><PlaceHolder /></Flex.Item>
      <Flex.Item><PlaceHolder /></Flex.Item>
    </Flex>
    <WhiteSpace size="lg" />
    <Flex>
      <Flex.Item><PlaceHolder /></Flex.Item>
      <Flex.Item><PlaceHolder /></Flex.Item>
      <Flex.Item><PlaceHolder /></Flex.Item>
      <Flex.Item><PlaceHolder /></Flex.Item>
    </Flex>
    <WhiteSpace size="lg" />
    {/* wrap  */}
    <div className="sub-title">Wrap</div>
    <Flex wrap="wrap">
      <PlaceHolder className="inline" />
      <PlaceHolder className="inline" />
      <PlaceHolder className="inline" />
      <PlaceHolder className="inline" />
      <PlaceHolder className="inline" />
      <PlaceHolder className="inline" />
      <PlaceHolder className="inline" />
    </Flex>
    <WhiteSpace size="lg" />
    {/* Justify = center 对齐方式 */}
    <div className="sub-title">Align</div>
    <Flex justify="center">
      <PlaceHolder className="inline" />
      <PlaceHolder className="inline" />
      <PlaceHolder className="inline" />
    </Flex>
    <WhiteSpace />
    <Flex justify="end">
      <PlaceHolder className="inline" />
      <PlaceHolder className="inline" />
      <PlaceHolder className="inline" />
    </Flex>
    <WhiteSpace />
    <Flex justify="between">
      <PlaceHolder className="inline" />
      <PlaceHolder className="inline" />
      <PlaceHolder className="inline" />
    </Flex>

    <WhiteSpace />
    <Flex align="start">
      <PlaceHolder className="inline" />
      <PlaceHolder className="inline small" />
      <PlaceHolder className="inline" />
    </Flex>
    <WhiteSpace />
    <Flex align="end">
      <PlaceHolder className="inline" />
      <PlaceHolder className="inline small" />
      <PlaceHolder className="inline" />
    </Flex>
    <WhiteSpace />
    <Flex align="baseline">
      <PlaceHolder className="inline" />
      <PlaceHolder className="inline small" />
      <PlaceHolder className="inline" />
    </Flex>
  </div>
);


// 下面的语言同样
// function FlexExample1(){
//     return (
//     <div className="flex-container">
//       <div className="sub-title">Basic</div>
//       <Flex>
//         <Flex.Item><PlaceHolder /></Flex.Item>
//         <Flex.Item><PlaceHolder /></Flex.Item>
//       </Flex>
//       <WhiteSpace size="lg" />
//       <Flex>
//         <Flex.Item><PlaceHolder /></Flex.Item>
//         <Flex.Item><PlaceHolder /></Flex.Item>
//         <Flex.Item><PlaceHolder /></Flex.Item>
//       </Flex>
//       <WhiteSpace size="lg" />
//       <Flex>
//         <Flex.Item><PlaceHolder /></Flex.Item>
//         <Flex.Item><PlaceHolder /></Flex.Item>
//         <Flex.Item><PlaceHolder /></Flex.Item>
//         <Flex.Item><PlaceHolder /></Flex.Item>
//       </Flex>
//       <WhiteSpace size="lg" />
  
//       <div className="sub-title">Wrap</div>
//       <Flex wrap="wrap">
//         <PlaceHolder className="inline" />
//         <PlaceHolder className="inline" />
//         <PlaceHolder className="inline" />
//         <PlaceHolder className="inline" />
//         <PlaceHolder className="inline" />
//         <PlaceHolder className="inline" />
//         <PlaceHolder className="inline" />
//       </Flex>
//       <WhiteSpace size="lg" />
  
//       <div className="sub-title">Align</div>
//       <Flex justify="center">
//         <PlaceHolder className="inline" />
//         <PlaceHolder className="inline" />
//         <PlaceHolder className="inline" />
//       </Flex>
//       <WhiteSpace />
//       <Flex justify="end">
//         <PlaceHolder className="inline" />
//         <PlaceHolder className="inline" />
//         <PlaceHolder className="inline" />
//       </Flex>
//       <WhiteSpace />
//       <Flex justify="between">
//         <PlaceHolder className="inline" />
//         <PlaceHolder className="inline" />
//         <PlaceHolder className="inline" />
//       </Flex>
  
//       <WhiteSpace />
//       <Flex align="start">
//         <PlaceHolder className="inline" />
//         <PlaceHolder className="inline small" />
//         <PlaceHolder className="inline" />
//       </Flex>
//       <WhiteSpace />
//       <Flex align="end">
//         <PlaceHolder className="inline" />
//         <PlaceHolder className="inline small" />
//         <PlaceHolder className="inline" />
//       </Flex>
//       <WhiteSpace />
//       <Flex align="baseline">
//         <PlaceHolder className="inline" />
//         <PlaceHolder className="inline small" />
//         <PlaceHolder className="inline" />
//       </Flex>
//     </div>
//   );
  
// }


ReactDOM.render(<FlexExample />, document.getElementById('root'));