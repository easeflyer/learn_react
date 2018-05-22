import React from 'react';
import { Carousel, WingBlank } from 'antd-mobile';

class Banner extends React.Component {
  state = {
    data: ['1', '2', '3'],
    imgHeight: 176,
  }
  componentDidMount() {
    // simulate img loading
    // 这里应该 用 fetch 或者 ajax 从数据库里 下载合理的图片和链接地址。就基本上完成了。
    setTimeout(() => {
      this.setState({
        data: ['http://img1.imgtn.bdimg.com/it/u=468607901,1588455290&fm=27&gp=0.jpg', 'http://img2.imgtn.bdimg.com/it/u=3697750747,3010173749&fm=27&gp=0.jpg', 'http://img0.imgtn.bdimg.com/it/u=1240263340,3709766928&fm=27&gp=0.jpg'],
      });
    }, 100);
  }
  render() {
    return (
        <Carousel
          //autoplay
          infinite
          beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
          afterChange={index => console.log('slide to', index)}
          // 此处 利用 数组.map 返回一个新数组，新数组为 组件数组，可以直接渲染。
        > 
          {this.state.data.map(val => (
            <a
              key={val}
              href="http://www.alipay.com"
              style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
            >
              <img
                src={val}
                alt=""
                style={{ width: '100%', verticalAlign: 'top' }}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'));
                  this.setState({ imgHeight: 'auto' });
                }}
              />
            </a>
          ))}
        </Carousel>
    );
  }
}

export default Banner;