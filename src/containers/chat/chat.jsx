import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    NavBar,
    List,
    InputItem,
} from 'antd-mobile';

import {sendMsg} from '../../redux/action';

const Item = List.Item;

class Chat extends Component {
    state = {
        content: ''
    };

    sendMsg = () => {
        const from = this.props.user._id;
        const to = this.props.match.params.userid;
        const content = this.state.content.trim();
        if (content) {
            this.props.sendMsg({from, to, content});
        }
        this.setState({content: ''});
    };

    render() {
        return (
            <div id='chat-page'>
                <NavBar>aa</NavBar>
                <List>
                    <Item
                        thumb={require(`../../assets/images/头像1.png`)}
                    >你好</Item>
                    <Item
                        className='chat-me'
                        extra={<img src={require(`../../assets/images/头像2.png`)}/>}
                    >
                        你好！
                    </Item>
                </List>
                <div className='am-tab-bar'>
                    <InputItem
                        placeholder='请输入'
                        value={this.state.content}
                        onChange={val => this.setState({content: val})}
                        extra={
                            <span onClick={this.sendMsg}>发送</span>
                        }
                    />
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({user: state.user}),
    {sendMsg}
)(Chat)