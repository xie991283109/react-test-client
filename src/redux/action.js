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
import {
    reqLogin,
    reqRegist,
    reqUpdateUser,
    reqUser,
    reqUserList,
    reqMsgList,
    reqReadMsg,
} from '../api/index';
import io from 'socket.io-client';

const authSuccess = (user) => ({type: AUTH_SUCCESS, data: user});
const errorMsg = (msg) => ({type: ERROR_MSG, data: msg});
const receiveUser = (user) => ({type: RECEIVE_USER, data: user});
const receiveuserList = (userlist) => ({type: RECEIVE_USER_LIST, data: userlist});
const receiveMsgList = ({users, chatMsgs, userid}) => ({type: RECEIVE_MSG_LIST, data: {users, chatMsgs, userid}});
const receiveMsg = (chatData, userid) => ({type: RECEIVE_MSG, data: {chatData, userid}});
const msgRead = ({count, from, to}) => ({type: MSG_READ, data: {count, from, to}});


function initIO(dispatch, userid) {  //初始化socket.io
    if (!io.socket) {  //创建单例对象
        io.socket = io('ws://localhost:4000');
        io.socket.on('receiveMsg', function (chatMsg) {
            // console.log('客户端接收服务器发送的消息', chatMsg);
            //只有chatMsg是与当前用户相关的信息，采取同步分发action
            if (userid === chatMsg.from || userid === chatMsg.to) {
                dispatch(receiveMsg(chatMsg, userid));
            }
        })
    }
}


async function getMsgList(dispatch, userid) {  //异步获取消息列表
    initIO(dispatch, userid);
    const res = await reqMsgList();
    if (res.data.code === 0) {
        const {users, chatMsgs} = res.data.data;
        dispatch(receiveMsgList({users, chatMsgs, userid}));
    }
}


export const resetUser = (msg) => ({type: RESET_USER, data: msg});


export const regist = (user) => {
    const {username, password, password2, type} = user;
    if (password !== password2) {
        return errorMsg('两次密码不一致');
    } else if (!username) {
        return errorMsg('请输入用户名');
    } else if (!password) {
        return errorMsg('请输入密码');
    } else if (!password2) {
        return errorMsg('请输入确认密码');
    } else {
        return async dispatch => {
            const res = await reqRegist({username, password, type});
            if (res.data.code === 0) {
                getMsgList(dispatch, user._id);
                dispatch(authSuccess(res.data.data));
            } else {
                dispatch(errorMsg(res.data.msg));
            }
        }
    }
};


export const login = (user) => {
    const {username, password} = user;
    if (!username) {
        return errorMsg('请输入用户名');
    } else if (!password) {
        return errorMsg('请输入密码');
    } else {
        return async dispatch => {
            const res = await reqLogin(user);
            if (res.data.code === 0) {
                getMsgList(dispatch, user._id);
                dispatch(authSuccess(res.data.data));
            } else {
                dispatch(errorMsg(res.data.msg));
            }
        }
    }
};


export const updateUser = (user) => {
    return async dispatch => {
        const res = await reqUpdateUser(user);
        if (res.data.code === 0) {
            getMsgList(dispatch, user._id);
            dispatch(receiveUser(res.data.data));
        } else {
            dispatch(resetUser(res.data.msg));
        }
    }
};


export const getUser = () => {
    return async dispatch => {
        const res = await reqUser();
        if (res.data.code === 0) {  //成功
            getMsgList(dispatch, res.data.data._id);
            dispatch(receiveUser(res.data.data));
        } else {
            dispatch(resetUser(res.data.msg));
        }
    }
};


export const getUserList = (type) => {
    return async dispatch => {
        const res = await reqUserList(type);
        if (res.data.code === 0) {
            dispatch(receiveuserList(res.data.data))
        }
    }
};


export const sendMsg = ({from, to, content}) => {
    return async dispatch => {
        console.log('发送消息', {from, to, content});
        io.socket.emit('sendMsg', {from, to, content})
    }
};


export const readMsg = (targetId, myId) => {
    return async dispatch => {
        const res = await reqReadMsg(targetId);
        if (res.data.code === 0) {
            const count = res.data.data;
            dispatch(msgRead({count, targetId, myId}))
        }
    }
};