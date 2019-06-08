import React from 'react';
import {Row, Col, BackTop} from 'antd';
import PCHeader from './pcHeader'
import PCFooter from './pcFooter'
import PCNewsImageBlock from './pcNewsImageBlock'
import CommonComments from './commonComments'
export default class PCNewsDetails extends React.Component{
    constructor(){
        super();
        this.state = {
            newsItem: ""
        }
    }
    componentDidMount(){
        var myFetchOptions = {
            method:'GET'
        };
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey="+this.props.params.uniquekey,myFetchOptions)
        .then(response=>response.json())
        .then(json=>{
            this.setState({newsItem:json});
            document.title = this.state.newsItem.title + " - React News";
        })
    }
    createMarkup(){
        return {__html: this.state.newsItem.pagecontent}
    }
    render(){
      return (
        <div>
            <PCHeader/>
            <Row>
                <Col span={2}></Col>
                <Col span={14} className="container">
                    <div class="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}></div>
                    <CommonComments uniquekey={this.props.params.uniquekey}/>
                </Col>
                <Col span={6}>
                <PCNewsImageBlock count={40} type="top" width="100%" cardTitle="相关新闻" imageWidth="150px"/>
                </Col>                
                <Col span={2}></Col>
            </Row>
            <PCFooter/>
            <BackTop/>
        </div>
      );
    }
}