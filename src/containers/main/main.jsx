import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import Cookies from 'js-cookie';
import {NavBar} from 'antd-mobile';

import LaobanInfo from '../laoban-info/laoban-info';
import DashenInfo from '../dashen-info/dashen-info';
import Laoban from '../laoban/laoban';
import Dashen from '../dashen/dashen';
import Message from '../message/message';
import Personal from '../personal/personal';
import NotFound from '../../components/not-found/not-found';
import NavFooter from '../../components/nav-footer/nav-footer';

import {getRedirectTo} from "../../utils";
import {getUser} from '../../redux/action';

class Main extends Component {
    navList = [
        {path: '/laoban', component: Laoban, title: '大神列表', icon: 'dashen', text: '大神'},
        {path: '/dashen', component: Dashen, title: '老板列表', icon: 'laoban', text: '老板'},
        {path: '/message', component: Message, title: '消息列表', icon: 'message', text: '消息'},
        {path: '/personal', component: Personal, title: '用户中心', icon: 'personal', text: '个人'},
    ];

    componentDidMount() {
        const userid = Cookies.get('userid');
        const {_id} = this.props.user;
        if (userid && !_id) {  //如果有userid，则发送请求
            this.props.getUser();
        }
    }

    render() {
        //读取cookie中的userid，检查用户是否登录
        const userid = Cookies.get('userid');
        if (!userid) {
            return <Redirect to='/login'/>
        }

        const {user} = this.props;
        if (!user._id) {
            return null;
        } else {
            let path = this.props.location.pathname;
            if (path === '/') {
                path = getRedirectTo(user.type, user.header);
                return <Redirect to={path}/>
            }
        }

        let {navList} = this;
        const path = this.props.location.pathname;
        const currentNav = navList.find(nav => nav.path === path);
        if (currentNav) {  //判断需要隐藏的路由
            if (user.type === 'laoban') {
                navList[1].hide = true;
            } else {
                navList[0].hide = true;
            }
        }
        navList = navList.filter(nav => !nav.hide);

        return (
            <div>
                {currentNav ? <NavBar>{currentNav.title}</NavBar> : null}
                <Switch>
                    {
                        navList.map((nav, index) => <Route key={index} path={nav.path} component={nav.component}/>)
                    }
                    <Route path='/laobaninfo' component={LaobanInfo}/>
                    <Route path='/dasheninfo' component={DashenInfo}/>
                    <Route component={NotFound}/>
                </Switch>
                {currentNav ? <NavFooter navList={navList}/> : null}
            </div>
        );
    }
}

export default connect(
    state => ({user: state.user}),
    {getUser}
)(Main)