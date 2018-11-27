import React, {Component} from 'react';
import {connect} from 'react-redux';
import {List, Badge} from 'antd-mobile';

const Item = List.Item;
const Brief = Item.Brief;

class Message extends Component {
    getLastMsgs = (chatMsgs) => {
        const lastMsgsObj = {};
        chatMsgs.forEach(msg => {
            const chatId = msg.chat_id;
            const lastMsg = lastMsgsObj[chatId];
            if (!lastMsg) {
                lastMsgsObj[chatId] = msg;
            } else {
                if (msg.create_time > lastMsg.create_time) {
                    lastMsgsObj[chatId] = msg;
                }
            }
        });

        const lastMsgs = Object.values(lastMsgsObj);
        lastMsgs.sort((msg1, msg2) => {  //按create_time降序排列
            return msg2.create_time - msg1.create_time;
        });
        return lastMsgs;
    };

    render() {
        const {user} = this.props;
        const {users, chatMsgs} = this.props.chat;

        //根据chat_id进行分组
        const lastMsgs = this.getLastMsgs(chatMsgs);

        return (
            <div>
                <List style={{marginTop: 50}}>
                    {
                        lastMsgs.map(msg => {
                            const targetUserId = msg.to === user._id ? msg.from : msg.to;
                            const targetUser = users[targetUserId];

                            return (
                                <Item
                                    key={msg._id}
                                    extra={<Badge text={3}/>}
                                    thumb={targetUser.header ? require(`../../assets/images/${targetUser.header}.png`) : null}
                                    arrow='horizontal'
                                    onClick={() => this.props.history.push(`/chat/${targetUserId}`)}
                                >
                                    {targetUser.username}
                                    <Brief>{msg.content}</Brief>
                                </Item>
                            )
                        })
                    }
                </List>
            </div>
        );
    }
}

export default connect(
    state => ({user: state.user, chat: state.chat}),
    {}
)(Message)