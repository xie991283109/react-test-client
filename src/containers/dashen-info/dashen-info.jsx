import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {
    NavBar,
    InputItem,
    TextareaItem,
    Button
} from 'antd-mobile';

import HeaderSelect from '../../components/header-select/header-select';
import {updateUser} from '../../redux/action';

class DashenInfo extends Component {
    state = {
        header: '',
        post: '',
        info: '',
    };

    handleChange = (name, val) => {
        this.setState({
            [name]: val
        });
    };

    saveInfo = () => {
        this.props.updateUser(this.state);
    };

    setHeader = (header) => {  //更新头像
        this.setState({
            header
        })
    };

    render() {
        const {header, type} = this.props.user;
        if (header) {  //如果信息已经完善，跳转到主页
            const path = type === 'dashen' ? 'dashen' : 'laoban';
            return <Redirect to={path}/>
        }
        return (
            <div>
                <NavBar>大神信息完善</NavBar>
                <HeaderSelect setHeader={this.setHeader}/>
                <InputItem onChange={val => {
                    this.handleChange('post', val)
                }} placeholder='请输入求职岗位'>求职岗位：</InputItem>
                <TextareaItem onChange={val => {
                    this.handleChange('info', val)
                }} rows={3} title='个人介绍：'/>
                <Button type='primary' onClick={this.saveInfo}>保&nbsp;&nbsp;存</Button>
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user}),
    {updateUser}
)(DashenInfo)