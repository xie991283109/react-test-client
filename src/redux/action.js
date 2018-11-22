import {
    AUTH_SUCCESS,
    ERROR_MSG,
    RECEIVE_USER,
    RESET_USER,
    RECEIVE_USER_LIST,
} from './action-types';
import {
    reqLogin,
    reqRegist,
    reqUpdateUser,
    reqUser,
    reqUserList,
} from '../api/index';


const authSuccess = (user) => ({type: AUTH_SUCCESS, data: user});
const errorMsg = (msg) => ({type: ERROR_MSG, data: msg});
const receiveUser = (user) => ({type: RECEIVE_USER, data: user});


export const resetUser = (msg) => ({type: RESET_USER, data: msg});


const receiveuserList = (userlist) => ({type: RECEIVE_USER_LIST, data: userlist});


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