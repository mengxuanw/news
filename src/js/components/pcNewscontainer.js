import React from 'react';
import {Row, Col, Tabs, Carousel}from 'antd';
const TabPane = Tabs.TabPane;

import PCNewsBlock from './pcBlock'
import PCNewsImageBlock from './pcNewsImageBlock'

export default class PCNewscontaier extends React.Component{
    render(){
        const settings = {
            dots:true,
            infinite:true,
            speed:500,
            slidesToShow:1,
            autoplay:true
        }
      return (
        <div>
            <Row>
                <Col span={2}></Col>
                <Col span={20} calss="container">
                    <div class="leftContainer">
                        <div class="carousel">
                            <Carousel {...settings}>
                                <div><img src="./src/images/carousel_1.jpg"/></div>
                                <div><img src="./src/images/carousel_2.jpg"/></div>
                                <div><img src="./src/images/carousel_3.jpg"/></div>
                                <div><img src="./src/images/carousel_4.jpg"/></div>
                            </Carousel>
                        </div>
                        <PCNewsImageBlock count={6} type="guoji" width="400px" cardTitle="国际头条" imageWidth="112px"/>
                    </div>
                    <Tabs class="tabs_news">
                        <TabPane tab="头条新闻" key="1">
                            <PCNewsBlock count={22} type="top" width="100%" bordered="false"/>
                        </TabPane>
                        <TabPane tab="国际" key="2">
                            <PCNewsBlock count={22} type="guoji" width="100%" bordered="false"/>
                        </TabPane>
                    </Tabs>
                    <div>
                    <PCNewsImageBlock count={8} type="guonei" width="100%" cardTitle="国内新闻" imageWidth="150px"/>
                    <PCNewsImageBlock count={16} type="yule" width="100%" cardTitle="娱乐新闻" imageWidth="150px"/>
                    </div>
                </Col>
                <Col span={2}></Col>
            </Row>
        </div>
      );
    }
}