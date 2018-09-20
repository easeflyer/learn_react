import React from 'react';
import ReactDOM from 'react-dom';

//jsx语法必须有一个外包裹的元素，当我们不需要这个包裹元素时
//可以用片段来包裹，这样不会增加额外的dom节点
const x = (
    <>
        <td>Hello</td>
        <td>World</td>
    </>
)
//如果你的工具，不支持<></>，你可以这样
const y = (
    <React.Fragment>
        <td>Hello</td>
        <td>World</td>
    </React.Fragment>
)

//你可以为片段增加key特性,但是<></>不能添加
const z = (
    <React.Fragment key={1}>
        <td>Hello</td>
        <td>World</td>
    </React.Fragment>
)