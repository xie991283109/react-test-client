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
        const {user} = this.props;
        const {users, chatMsgs} = this.props.chat;
        //计算当前聊天id
        const myid = user._id;
        const targetId = this.props.match.params.userid;
        const chat_id = [myid, targetId].sort().join('_');
        const msgs = chatMsgs.filter(msg => msg.chat_id === chat_id);

        if (!users[myid]) {
            return null;
        }

        // console.log(targetId, users, chatMsgs, users[targetId]);
        return (
            <div id='chat-page'>
                <NavBar>{users[targetId].username}</NavBar>
                <List>
                    {
                        msgs.map((msg, index) => {
                            if (myid === msg.to) {
                                return <Item key={index} thumb={require(`../../assets/images/${users[myid].header}.png`)}>{msg.content}</Item>
                            } else {
                                return <Item
                                    key={index}
                                    className='chat-me'
                                    extra={<img src={require(`../../assets/images/${users[targetId].header}.png`)}/>}>{msg.content}</Item>
                            }
                        })
                    }
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
    state => ({user: state.user, chat: state.chat}),
    {sendMsg}
)(Chat)