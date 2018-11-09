import React, {Component} from 'react';
import {
    NavBar,
    WingBlank,
    List,
    InputItem,
    WhiteSpace,
    Radio,
    Button
} from 'antd-mobile';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import {regist} from '../../redux/action'
import Logo from '../../components/logo/logo';

const ListItem = List.Item;

class Regist extends Component {
    state = {
        username: '',
        password: '',
        password2: '',
        type: 'dashen',  //用户类型  dashen/laoban
    };

    regist = () => {
        this.props.regist(this.state);
    };

    handleChange = (type, val) => {  //根据输入内容，更新state
        this.setState({
            [type]: val
        })
    };

    toLogin = () => {
        this.props.history.push('/login');
    };

    render() {
        const {type} = this.state;
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
                        <InputItem type='password2' onChange={val => {
                            this.handleChange('password2', val)
                        }}>确认密码：</InputItem>
                        <WhiteSpace/>
                        <ListItem>
                            <span>用户类型：</span>&nbsp;&nbsp;&nbsp;&nbsp;
                            <Radio checked={type === 'dashen'} onChange={val => {
                                this.handleChange('type', 'dashen')
                            }}>大神</Radio>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Radio checked={type === 'laoban'} onChange={val => {
                                this.handleChange('type', 'laoban')
                            }}>老板</Radio>
                        </ListItem>
                        <WhiteSpace/>
                        <Button type='primary' onClick={this.regist}>注册</Button>
                        <WhiteSpace/>
                        <Button onClick={this.toLogin}>已有账户</Button>
                    </List>
                </WingBlank>
            </div>
        );
    }
}

export default connect(
    state => ({user: state.user}),
    {regist}
)(Regist)