import * as user from '../DAO/user'
import {UserInfoData} from '../models/user_info';
import mongoose from '../../mongoose';
import deleteFolder from '../../utils/deleteFolder';
const queryUser = function (body: Record<string, any>) : Promise<string> {
    const userName : string = body.userName || '';
    const password : string = body.password || '';
    return user.queryUserByName(userName).then((data: any) => {
        if (data) {
            if (data.password === password) {
                // 用户id
                return data.id;
            }
            // 密码错误
            return 'badPassword'
        }
        // 没有该用户
        return 'notFoundUser';
    });
}

const queryUserById = (id : string, selectObj ?: {select?: string[], unSelect ?: string[]}) => {
    let selectList : Record<string, any> = {};
    if (selectObj) {
        if (selectObj['unSelect']) {
            selectObj['unSelect'].forEach( (item, index) => {
                selectList[item] = 0
            } )
        }else if (selectObj['select']){
            selectObj['select'].forEach( (item, index) => {
                selectList[item] = 1
            } )
        }
    }
    return user.queryUserById(id, selectList).then( (userInfo : any ) => {
        if (userInfo) {
            return userInfo;
        }else {
            return '';
        }
    });
}

const getUserInfo = function (query : Record<string, any>) {
    const id : string = query.id || '';
    return user.queryUserById(id).then( (userInfo : any) => {
        if (userInfo) {
            return userInfo;
        }else {
            return '';
        }
    });
}

const addUser = function (body : Record<string, any>) {
    const userInfoData : UserInfoData = {
        userName: body.userName,
        password: body.password,
        sex: body.sex,
        phone: body.phone,
        id: mongoose.Types.ObjectId(),
        createTime: new Date()
    }  
    return user.addUserInfo(userInfoData);
}

const modifyUserInfo = (body: Record<string, any>) => {
    let id : string = body.id || '';
    let userInfo : Record<string, any> = body.userInfo || {};
    return user.modifyUserInfoById(id, userInfo).then((data: any) => {
        return user.queryUserById(id);
    });
}
const updatePassword = (query : Record<string, any>) => {
    const id : string = query.id || '';
    const newPassword : string = query.newPassword || '';
    return user.updatePasswordById(id, newPassword);
}

export {
    queryUser,
    queryUserById,
    addUser,
    getUserInfo,
    modifyUserInfo,
    updatePassword
}