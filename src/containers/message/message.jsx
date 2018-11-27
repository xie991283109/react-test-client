import React, {Component} from 'react';
import {connect} from 'react-redux';
import {List, Badge} from 'antd-mobile';

const Item = List.Item;
const Brief = Item.Brief;

class Message extends Component {
    getLastMsgs = (chatMsgs, userid) => {  //获取最新聊天记录
        const lastMsgsObj = {};
        chatMsgs.forEach(msg => {
            //对msg进行个体的统计
            if (msg.to === userid && !msg.read) {
                msg.unReadCount = 1;
            } else {
                msg.unReadCount = 0;
            }

            const chatId = msg.chat_id;
            const lastMsg = lastMsgsObj[chatId];
            if (!lastMsg) {
                lastMsgsObj[chatId] = msg;
            } else {
                const unReadCount = lastMsg.unReadCount;
                if (msg.create_time > lastMsg.create_time) {
                    lastMsgsObj[chatId] = msg;
                }
                lastMsgsObj[chatId].unReadCount = unReadCount + msg.unReadCount;
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
        const lastMsgs = this.getLastMsgs(chatMsgs, user._id);

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
                                    extra={<Badge text={msg.unReadCount}/>}
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