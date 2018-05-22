/**
 * Main.js  位于 banner 下面的页面主要区域。
 * 计划安排4个 grid 
 * 和 下面的分组列表。
 * 
 * ------------------------------------
 *                  |
 *                  |
 *                  |
 *                  |
 * ------------------------------------
 *                  |
 *                  |
 *                  |
 *                  |
 * ------------------------------------
 * 
 * 
 * 
 * 
 * ------------------------------------
 * 
 * 
 * 
 * ------------------------------------
 * 
 * 
 * ------------------------------------
 */
import React from 'react';
import { Grid, Flex, List, } from 'antd-mobile';
import { Icon } from 'antd'
import './GridSection.css'
const Item = List.Item;
const Brief = Item.Brief;
/**
 * 四个grid 的内容。可以补充 事件处理
 */
const data = [{
    icon: 'red-envelope',
    text: { title: '分享的红包', desc: '一大波红包正在等你' },
}, {
    icon: 'flag',
    text: { title: '俱乐部招募', desc: '欢迎优秀团队加入' }
}, {
    icon: 'solution',
    text: { title: '成绩查询', desc: '近期比赛成绩查询' }
}, {
    icon: 'video-camera',
    text: { title: '桥牌课堂', desc: '从入门到高手' }
}];

function GridItem(el, index) {
    return (
        <Flex justify="center" align="center" style={{ border: '0px' }}>
            <Flex.Item style={{ flex: 3, border: '0px' }}>
                <b style={{ fontSize: '14px' }}>{el.text.title}</b><br />
                <font color="#cccccc">{el.text.desc}</font>
            </Flex.Item>
            <Flex.Item style={{ flex: 1, border: '0px' }}><Icon type={el.icon} style={{ fontSize: '26px', color: '#555599' }} /></Flex.Item>
        </Flex>

    );
}
const Separator = ()=>(
    <div style={{
        backgroundColor: '#F5F5F9',
        height: 8,
        borderTop: '1px solid #ECECED',
        borderBottom: '1px solid #ECECED'        
    }}>

    </div>
);
const GridSection = () => (
    <div>
        <Grid
            data={data}
            columnNum={2}
            activeStyle={false}
            square={false}
            itemStyle={{ fontSize: '12px', padding: '8px 5px', borderBottom: '1px solid #eeeeee' }}
            renderItem={(el, index) => GridItem(el, index)}
        //isCarousel={true}  // 是否跑马灯  非常有用
        />
        <Separator />
        <List renderHeader={() => '网站新闻'} className="my-list">
            <Item thumb="http://img5.imgtn.bdimg.com/it/u=3318747708,1678519635&fm=27&gp=0.jpg" multipleLine>
            中国桥牌协会大师分英雄榜<Brief>2018-5-14~2018-5-20</Brief>
            </Item>

            <Item thumb="http://img5.imgtn.bdimg.com/it/u=3318747708,1678519635&fm=27&gp=0.jpg" multipleLine>
            仁者乐山，智者乐桥：无问输赢，但问过程<Brief>2018-5-21</Brief>
            </Item>
            <Item thumb="http://img5.imgtn.bdimg.com/it/u=3318747708,1678519635&fm=27&gp=0.jpg" multipleLine>
            让桥牌哲理锻造强国一代<Brief>2018-5-25</Brief>
            </Item>
            
        </List>
    </div>
);

export default GridSection;