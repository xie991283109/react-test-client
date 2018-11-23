import ajax from './ajax';

export const reqRegist = (user) => ajax('/register', user, 'POST');
export const reqLogin = (user) => ajax('/login', user, 'POST');
export const reqUpdateUser = (user) => ajax('/update', user, 'POST');
export const reqUser = () => ajax('/user');
export const reqUserList = (type) => ajax('/userList', {type});
export const reqMsgList = () => ajax('/msgList');
export const reqReadMsg = (from) => ajax('/readmsg', {from}, 'POST');