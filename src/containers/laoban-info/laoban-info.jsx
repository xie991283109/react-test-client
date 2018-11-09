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

class LaobanInfo extends Component {
    state = {
        header: '',
        post: '',
        info: '',
        company: '',
        salary: '',
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
        if (header) {  //若信息已经完善，跳转到主页
            const path = type === 'dashen' ? 'dashen' : 'laoban';
            return <Redirect to={path}/>
        }
        return (
            <div>
                <NavBar>老板信息完善</NavBar>
                <HeaderSelect setHeader={this.setHeader}/>
                <InputItem onChange={val => {
                    this.handleChange('post', val)
                }} placeholder='请输入招聘职位'>招聘职位：</InputItem>
                <InputItem onChange={val => {
                    this.handleChange('company', val)
                }} placeholder='请输入公司名称'>公司名称：</InputItem>
                <InputItem onChange={val => {
                    this.handleChange('salary', val)
                }} placeholder='请输入职位薪资'>职位薪资：</InputItem>
                <TextareaItem onChange={val => {
                    this.handleChange('info', val)
                }} rows={3} title='职位要求：'/>
                <Button type='primary' onClick={this.saveInfo}>保&nbsp;&nbsp;存</Button>
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user}),
    {updateUser}
)(LaobanInfo)