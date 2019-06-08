import React from 'react';
import ReactDOM from 'react-dom';
import {Router,Route,hashHistory} from 'react-router';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import MediaQuery from 'react-responsive';
import PCIndex from './components/pcIndex';
import MobileIndex from './components/mobileIndex';
import PCNewsDetails from './components/pcDetail';
import MobileNewsDetails from './components/mobileDetails';
import PCUserCenter from './components/pcUserCenter';
import MobileUserCenter from './components/mobileUserCenter';

export default class Root extends React.Component{
  render(){
    return (
      //这里替换了之前的 Index，变成了程序的入口
      <div>
        <MediaQuery query='(min-device-width:1224px)'>
          <Router history={hashHistory}>
            <Route path="/" component={PCIndex}></Route>
            <Route path="/details/:uniquekey" component={PCNewsDetails}></Route>
            <Route path="/usercenter" component={PCUserCenter}></Route>
          </Router>
        </MediaQuery>
        <MediaQuery query='(max-device-width:1224px)'>
          <Router history={hashHistory}>
            <Route path="/" component={MobileIndex}></Route>
            <Route path="/details/:uniquekey" component={MobileNewsDetails}></Route>
            <Route path="/mobilecenter" component={MobileUserCenter}></Route>
          </Router>
        </MediaQuery>
      </div>
    );
  }
}

ReactDOM.render(<Root/>, document.getElementById('mainContainer'));