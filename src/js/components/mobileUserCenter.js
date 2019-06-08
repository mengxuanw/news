import React from 'react';
import ReactDOM from 'react-dom';
import {Button, Row, Col, Modal, Menu, Icon, Tabs, Form, Input, Checkbox, message, Card, notification, Upload} from 'antd';
import { Link, Route, Router, browserHistory} from 'react-router';
import MobileHeader from './mobileHeader'
import MobileFooter from './mobileFooter'

const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const TabPane = Tabs.TabPane;
export default class MobileUserCenter extends React.Component{
    constructor(){
        super();
        this.state = {
            usercollection: '',
            previewImage: "",
            previewVisible: false
        }
    }

    componentDidMount(){
        var myFetchOptions = {
          method: 'GET'
        };
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid="+localStorage.userid, myFetchOptions)
        .then(response=>response.json()).then(json=>{
          this.setState({usercollection:json})
        });
    }

    render(){
        const props = {
            action: "http://newsapi.gugujiankong.com/Handler.ashx",
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            listType: "picture-card",
            defaultFieldList: [
                {
                    uid:-1,
                    name: "xxx.jpg",
                    state: 'done',
                    url: 'https://img1.doubanio.com/view/group_topic/large/public/p126054617.jpg',
                    thumbUrl: 'https://img1.doubanio.com/view/group_topic/large/public/p126054617.jpg'
                }
            ],
            onPreview: (file)=>{
                this.setState({previewImage:file.url, previewVisible:true})
            }
        }

        const {usercollection} = this.state;
        const usercollectionList =usercollection.length
        ?
        usercollection.map((uc, index)=>(
          <Card key={index} title={uc.uniquekey} extra={<a target="_blank" href={`/#/details/${uc.uniquekey}`}>查看</a>}>
            <p>{uc.title}</p>
          </Card>
        ))
        :
        '您还没有收藏'
        ;

      return (
        <div>
        <MobileHeader/>
        <Row>
          <Col span={24}>
            <Tabs>
              <TabPane tab="我的收藏列表" key="1">
                <Row>
                    <Col span={24}>
                    {usercollectionList}
                    </Col>
                </Row>
              </TabPane>
              <TabPane tab="我的评论" key="2">

              </TabPane>
              <TabPane tab="头像设置" key="3">
                <div class="clearfix">
                    <Upload {...this.props}>
                        <Icon type="plus"/>
                        <div className="ant-upload-text">上传照片</div>
                    </Upload>
                    <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
                        <img alt="预览" src={this.state.previewImage}/>
                    </Modal>
                </div>
              </TabPane>
            </Tabs>
          </Col>
        </Row>
        <MobileFooter/>
        </div>
    )}
}