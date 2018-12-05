import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Cookies from 'js-cookie';
import {Redirect} from 'react-router-dom';
import LaobanInfo from '../../containers/laoban-info';
import DashenInfo from '../../containers/dashen-info';
import Laoban from '../laoban';
import Message from '../message';
import Personal from '../personal';
import Footer from '../footer';

import {NavBar} from 'antd-mobile';
class Main extends Component {
  NavList = [
    {path:"/laoban",titel:'大神列表',icon:'laoban',text:'大神'},
    {path:"/dashen",titel:'老板列表',icon:'dashen',text:'老板'},
    {path:"/message",titel:'消息列表',icon:'message',text:'消息'},
    {path:"/personal",titel:'个人中心',icon:'personal',text:'个人'},
  ];
  render () {
    const userid  =Cookies.get('userid');
    if(!userid){
      return <Redirect to="/login"/>
    }
    //获取路由路径
    const {pathname} = this.props.location;
    const currNav = this.NavList.find(item => (item.path === pathname));

    return (
      <div>
        {currNav ? <NavBar>{currNav.titel}</NavBar> : null}
        <Route path="/laobaninfo" component={LaobanInfo}/>
        <Route path="/dasheninfo" component={DashenInfo}/>
        <Route path="/laoban" component={Laoban}/>
        <Route path="/message" component={Message}/>
        <Route path="/personal" component={Personal}/>
        {currNav ? <Footer NavList={this.NavList}/> : null}
      </div>
    )
  }
}

export default Main;