import React from 'react';
import ReactDOM from 'react-dom';
//import QueueAnim from 'rc-queue-anim'; // 负责转场动画
import './style.css'
import QueueAnim from 'rc-queue-anim';
import { SearchBar } from 'antd-mobile';

export default class StaffSearch extends React.Component {
    state = {
        value: '美食',
    };
    //   componentDidMount() {
    //     this.autoFocusInst.focus();
    //   }
    //   onChange= (value) => {
    //     this.setState({ value });
    //   };
    //   clear = () => {
    //     this.setState({ value: '' });
    //   };
    //   handleClick = () => {
    //     this.manualFocusInst.focus();
    //   }
    handleOnSubmit = (value) => {
        this.props.search(value);
    }
    handleOnBlur = () => {
        //alert(333);
        this.props.searchStaff();
    }
    componentDidMount = ()=> {
        console.log('mySearch..................');
        console.log(this.autoFocus);
        //this.autoFocus.focus();
        //setTimeout(()=>this.autoFocus.focus(),315);
        
    }
    render() {
        return (
            // 下面特别注意 onEnd 的使用。因为动画完毕之前 SearchBar 组件还没有渲染出来，那么他的 focus() 也就不存在。不能提前执行。
            <QueueAnim type="top" delay={300} className="queue-simple" onEnd={()=>this.autoFocus.focus()}>
                <div key={1} style={{ position: 'absolute', zIndex: '50', width: '100%' }}>
                    <SearchBar placeholder="Search" maxLength={8} onBlur={this.handleOnBlur} onSubmit={this.handleOnSubmit}
                         ref={ el => this.autoFocus = el}
                    />
                </div>
            </QueueAnim>
        );
    }
}

