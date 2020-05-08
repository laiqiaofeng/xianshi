import UserInfoModel, {UserInfoData} from '../models/user_info';
import mongoose from '../../mongoose';


const addUserInfo = function (userInfoData : UserInfoData) {
    const user = new UserInfoModel(userInfoData);
    return new Promise((resolve, reject) => {
        user.save((err:Error | null) => {
            if (err) {
                reject(err)
            }else {
                resolve(user)
            }
        })
    })
}

const queryUserByName = function (userName : string) : Promise<Record<string, any> | null> {
    return new Promise((resolve, reject) => {
        UserInfoModel.find({"userName": userName}, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data[0]);
            }
        })
    })
}

const queryUserById = (id : string, result ?: Record<string, any>) => {
    return new Promise((resolve, reject) => {
        UserInfoModel.find({"id": mongoose.Types.ObjectId(id)}, result || {}, (err: Error , data : Record<string, any>) => {
            if (err) {
                reject(err);
            }else {
                resolve(data[0])
            }
        })
    })
}

const modifyUserInfoById = function (id: string, userInfo: Record<string, any>) {
    return new Promise((resolve, reject) =>{
        UserInfoModel.update({"id":  mongoose.Types.ObjectId(id)}, {$set: userInfo}, (err: Error, raw : any) => {
            if (err) {
                reject(err);
            }else {
                resolve(raw);
            }
        });
    })
}

const updatePasswordById = (id : string, newPassword : string) => {
    return new Promise((resolve, reject) =>{
        
        UserInfoModel.update({"id" : mongoose.Types.ObjectId(id)}, {$set: {
            "password" : newPassword
        } }, (err : Error, raw : any) => {
            if (err)  {
                reject(err);
            } else {
                resolve(raw);
            }
        });
    });
} 

export {
    addUserInfo,
    queryUserByName,
    queryUserById,
    modifyUserInfoById,
    updatePasswordById
}