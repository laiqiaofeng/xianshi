import mongoose from '../../mongoose';

const Schema  = mongoose.Schema;

export enum PlanState  {
    // 正在进行中
    underway = 'underway',
    // 失败
    unfinished = 'unfinished',
    // 完成
    finish = 'finish'
}
export enum PlanType {
    // 非常重要的
    important = "important",
    // 轻松的
    relaxed = "relaxed"
}
const PlanModel = new Schema({
    name: {
        type: String,
        required: true,
        index: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        index: true
    },
    id: {
        type: Schema.Types.ObjectId,
        required: true,
        index: true
    },
    remindDateTime : String, 
    targetList: Array,
    createTime: Schema.Types.Date,
    planType: {
        type: PlanType,
        default: PlanType.important,
        index: true
    },
    state: {
        type: PlanState,
        default: PlanState.underway,
        index: true
    }
});

export interface Plan {
    name : string, 
    userId: mongoose.Types.ObjectId,
    id: mongoose.Types.ObjectId,
    createTime: Date,
    remindDateTime ?: String, 
    targetList: Record<string, any>[],
    state ?: PlanState,
    planType ?: PlanType
}

const UserInfoModel = mongoose.model('plan', PlanModel, 'plan');

export default UserInfoModel;