import React, {Component} from 'react';
import {
    NavBar,
    WingBlank,
    List,
    InputItem,
    WhiteSpace,
    Button
} from 'antd-mobile';
import {Redirect} from 'react-router-dom';
import {connect} from "react-redux";

import Logo from '../../components/logo/logo';


import {login} from '../../redux/action'

class Login extends Component {
    state = {
        username: '',
        password: '',
    };

    handleChange = (type, val) => {  //根据输入内容，更新state
        this.setState({
            [type]: val
        })
    };

    login = () => {
        this.props.login(this.state)
    };

    toRegist = () => {
        this.props.history.push('/regist');
    };

    render() {
        const {msg, redirectTo} = this.props.user;

        if (redirectTo) {
            return <Redirect to={redirectTo}/>
        }

        return (
            <div>
                <NavBar>硅 谷 直 聘</NavBar>
                <Logo/>
                <WingBlank>
                    <List>
                        {msg ? <div className='error-msg'>{msg}</div> : null}
                        <WhiteSpace/>
                        <InputItem onChange={val => {
                            this.handleChange('username', val)
                        }}>用户名：</InputItem>
                        <WhiteSpace/>
                        <InputItem type='password' onChange={val => {
                            this.handleChange('password', val)
                        }}>密&nbsp;&nbsp;&nbsp;码：</InputItem>
                        <WhiteSpace/>
                        <Button type='primary' onClick={this.login}>登录</Button>
                        <WhiteSpace/>
                        <Button onClick={this.toRegist}>注册</Button>
                    </List>
                </WingBlank>
            </div>
        );
    }
}

export default connect(
    state => ({user: state.user}),
    {login}
)(Login)