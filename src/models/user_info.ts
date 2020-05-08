import mongoose from '../../mongoose';

const Schema  = mongoose.Schema;

const UserInfoSchema = new Schema({
    userName: String,
    password: String,
    id: {
        type: Schema.Types.ObjectId,
        required: true,
        index: true
    },
    phone: String,
    createTime: String,
    updateTime: {
        type: Schema.Types.Date,
        default: ''
    },
    sex: {
        type: Number,
        default: 1
    },
    signature: {
        type: String,
        default: ''
    },
    bannerUrl:{
        type: String,
        default: ''
    },
    avatarUrl: {
        type: String,
        default: ''
    } 
});

export interface UserInfoData {
    userName: string,
    password: string,
    id ?: mongoose.Types.ObjectId,
    phone: string,
    createTime: Date,
    sex ?: number,
    avatarUrl ?: string,
    bannerUrl ?: string,
    signature ?: string,
    updateTime ?: string
}

const UserInfoModel = mongoose.model('user', UserInfoSchema, 'user')

export default UserInfoModel;