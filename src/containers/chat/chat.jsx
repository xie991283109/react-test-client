import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    NavBar,
    List,
    InputItem,
    Grid,
    Icon,
} from 'antd-mobile';

import {sendMsg} from '../../redux/action';

const Item = List.Item;

class Chat extends Component {
    state = {
        content: '',
        showEmoji: false
    };

    componentWillMount() {  //在第一次render之前回调
        const emojis = ['😁', '😂', '😃', '😉', '😊', '😁', '😂', '😃', '😉', '😊', '😁', '😂', '😃', '😉', '😊', '😁', '😂', '😃', '😁', '😂', '😃', '😉', '😊', '😁', '😂', '😃', '😁', '😂', '😃', '😉', '😊', '😁', '😂', '😃', '😁', '😂', '😃', '😉', '😊', '😁', '😂', '😃',];
        this.emojis = emojis.map(emoji => ({text: emoji}));
    }

    componentDidMount() {  //初始时滑到底部
        window.scrollTo(0, document.body.scrollHeight);
    }

    componentDidUpdate() {  //更新对话时滑到底部
        window.scrollTo(0, document.body.scrollHeight);
    }

    sendMsg = () => {
        const from = this.props.user._id;
        const to = this.props.match.params.userid;
        const content = this.state.content.trim();
        if (content) {
            this.props.sendMsg({from, to, content});
        }
        this.setState({content: '', isShow: false});
    };

    toggleShow = () => {  //交替显示表情
        const isShow = !this.state.isShow;
        this.setState({isShow});
        if (isShow) {
            setTimeout(() => {
                window.dispatchEvent(new Event('resize'))
            }, 0)
        }
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
                <NavBar className='stick-top'
                        icon={<Icon type='left'/>}
                        onLeftClick={() => {
                            this.props.history.goBack()
                        }}
                >
                    {users[targetId].username}
                </NavBar>
                <List style={{marginTop: 50, marginBottom: 50}}>
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
                        onFocus={() => this.setState({isShow: false})}
                        extra={
                            <span>
                                <span
                                    onClick={this.toggleShow}
                                    style={{marginRight: 5}}>😁</span>
                                <span onClick={this.sendMsg}>发送</span>
                            </span>
                        }
                    />
                </div>
                {
                    this.state.isShow ? (<Grid
                            data={this.emojis}
                            columnNum={8}
                            carouselMaxRow={4}
                            isCarousel={true}
                            onClick={(item) => {
                                this.setState({content: this.state.content + item.text})
                            }}
                            style={{position: 'fixed', bottom: 0}}
                        />)
                        : null
                }
            </div>
        );
    }
}

export default connect(
    state => ({user: state.user, chat: state.chat}),
    {sendMsg}
)(Chat)