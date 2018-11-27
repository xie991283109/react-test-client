import {combineReducers} from 'redux'
import {
    AUTH_SUCCESS,
    ERROR_MSG,
    RECEIVE_USER,
    RESET_USER,
    RECEIVE_USER_LIST,
    RECEIVE_MSG_LIST,
    RECEIVE_MSG,
    MSG_READ,
} from './action-types';

import {getRedirectTo} from '../utils';

const initUser = {
    username: '', // 用户名
    type: '', // 类型
    msg: '', // 错误提示信息
    redirectTo: '' // 需要自动跳转的路由path
};

function user(state = initUser, action) {
    switch (action.type) {
        case AUTH_SUCCESS: // 认证成功
            const {type, header} = action.data;
            return {...action.data, redirectTo: getRedirectTo(type, header)};
        case ERROR_MSG: // 错误信息提示
            return {...state, msg: action.data};
        case RECEIVE_USER:
            return action.data;
        case RESET_USER:
            return {...initUser, msg: action.data};
        default:
            return state
    }
}


const initUserList = [];

function userList(state = initUserList, action) {
    switch (action.type) {
        case RECEIVE_USER_LIST:
            return action.data;
        default:
            return state;
    }
}


const initChat = {
    users: {},
    chatMsgs: [],
    unReadCount: 0
};

function chat(state = initChat, action) {
    console.log(111, action.data);
    switch (action.type) {
        case RECEIVE_MSG_LIST:
            let {users, chatMsgs, userid} = action.data;
            return {
                users,
                chatMsgs,
                unReadCount: chatMsgs.reduce((preCount, msg) => preCount + (!msg.read && msg.to === userid ? 1 : 0), 0)
            };
        case RECEIVE_MSG:
            let {chatMsg} = action.data;
            return {
                users: state.users,
                chatMsgs: [...state.chatMsgs, action.data],
                unReadCount: state.unReadCount + (!chatMsg.read && chatMsg.to === action.data.userid ? 1 : 0)
            };
        case MSG_READ:
            const {from, to, count} = action.data;
            state.chatMsgs.forEach(msg => {
                if (msg.from === from && msg.to === to && !msg.read) {
                    msg.read = true;
                }
            });

            return {
                users: state.users,
                chatMsgs: state.chatMsgs.map(msg => {
                    if (msg.from === from && msg.to === to && !msg.read) {
                        return {...msg, read: true}
                    } else {
                        return msg;
                    }
                }),
                unReadCount: state.unReadCount - count
            };
        default:
            return state;
    }
}

// 返回合并的reducer
export default combineReducers({
    user,
    userList,
    chat
})