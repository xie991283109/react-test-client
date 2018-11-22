import {combineReducers} from 'redux'
import {
    AUTH_SUCCESS,
    ERROR_MSG,
    RECEIVE_USER,
    RESET_USER,
    RECEIVE_USER_LIST,
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

// 返回合并的reducer
export default combineReducers({
    user,
    userList
})