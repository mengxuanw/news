import React from 'react';
import {Button, Row, Col, Modal, Menu, Icon, Tabs, Form, Input, Checkbox, message } from 'antd';
import { Link, Route, Router, browserHistory} from 'react-router';

const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const TabPane = Tabs.TabPane;

class MobileHeader extends React.Component{
    constructor(){
        super();
        this.state = {
            current: 'top',
            modalVisible: false,
            action: 'login',
            hasLogined: false,
            userNickName: '',
            userid: 0
        }
    }
    componentWillMount(){
        if(localStorage.userid != "")
        {
            this.setState({userid:localStorage.userNickName,userNickName:localStorage.userNickName});
            this.setState({hasLogined:true});
        }
    }
    setModalVisible(value)  
    {
        this.setState({modalVisible:value});
    }
    handleClick(e){
        if(e.key == "register"){
            this.setState({current:'register'});
            this.setModalVisible(true);
        }
        else{
           this.setState({current: e.key}) ;
        }
    }
    handleSubmit(e){
        //页面开始提交数据
        e.preventDefault();
        var myFetchOptions = {
            method: 'GET'
        };
        this.props.form.validateFields((err,values) =>{
            if(!err){
                console.log('received values of form: ', values);
                fetch("http://newsapi.gugujiankong.com/Handler.ashx?action="+this.state.action
                +"&username="+values.userName+"&password="+values.password
                +"&r_userName="+values.r_userName+"&r_password="+values.r_password+"&r_confirmPassword="
                +values.r_confirmPassword,myFetchOptions)
                .then(response=>response.json()).then(json=>{
                    this.setState({
                        userNickName:json.NickUserName, userid:json.UserId
                    });
                    localStorage.userid = json.UserId;
                    localStorage.userNickName = json.NickUserName;
                });
                if(this.state.action="login"){
                    this.setState({hasLogined:true})
                }
                message.success("请求成功");
                this.setModalVisible(false);
            }else{
                console.log(err);
            }
        })
    }
    login(){
        this.setModalVisible(true);
    }
    callback(key){
        if(key == 1){
            this.setState({action:'login'});
        }
        else if(key == 2){
            this.setState({action:'register'});
        }
    }
    logout(){
        localStorage.userid = "";
        localStorage.userNickName = "";
        this.setState({hasLogined:false});
    }
    render(){

        const { getFieldDecorator } = this.props.form;

        const userShow = this.state.hasLogined ?
        <Link to={`/mobilecenter`}>
            <Icon type="inbox" onClick={this.logout.bind(this)}/>
        </Link>
        :
        <Icon type="setting" onClick={this.login.bind(this)}/>
      return (
        <div id="mobileheader">
            <header>
                <img src="./src/images/logo.png" alt="logo"/>
                <span>ReactNews</span>
                {userShow}
            </header>

            <Modal title="用户中心" wrapClassName="vertical-center-modal" visible={this.state.modalVisible}
            onCancel={()=>this.setModalVisible(false)}
            onOk={()=>this.setModalVisible(false)} okText="关闭">
            <Tabs type="card" onChange={this.callback.bind(this)}>

                <TabPane tab="登录" key="1">
                    <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
                        <FormItem label="账户">
                            {getFieldDecorator('userName')(<Input placeholder="输入账号"/>)}
                        </FormItem>
                        <FormItem label="密码">
                            {getFieldDecorator('password')(<Input type="password" placeholder="输入密码"/>)}  
                        </FormItem>
                        <Button type="primary" htmlType="submit">登录</Button>
                    </Form>
                </TabPane>

                <TabPane tab="注册" key="2">
                    <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
                        <FormItem label="账户">
                            {getFieldDecorator('r_userName')(<Input placeholder="输入账号"/>)}
                        </FormItem>
                        <FormItem label="密码">
                            {getFieldDecorator('r_password')(<Input type="password" placeholder="输入密码"/>)}  
                        </FormItem>
                        <FormItem label="确认密码">
                            {getFieldDecorator('r_confirmPassword')(<Input type="password" placeholder="再次输入密码"/>)} 
                        </FormItem>
                        <Button type="primary" htmlType="submit">注册</Button>
                    </Form>
                </TabPane>
            </Tabs>
            </Modal>

        </div>
      );
    }
}

export default MobileHeader = Form.create({})(MobileHeader);