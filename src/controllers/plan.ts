import * as planDAO from '../DAO/plan'
import mongoose from '../../mongoose';
import { PlanType, Plan, PlanState } from '../models/plan'; 
 
const getPlanList  = (query : Record<string, any>) => {
    const userId : string = query.userId || '';
    const pageIndex : number = Number(query.pageIndex) || 1;
    const pageSize : number = Number(query.pageSize)|| 5;
    const planState : string = query.planState || PlanState.underway;
    const planType : string = query.planType || PlanType.important;
    return planDAO.getPlanList(userId, pageIndex, pageSize, planState, planType);
}

const deletePlan = (body : Record<string, any>) => {
    const id : mongoose.Types.ObjectId = mongoose.Types.ObjectId(body.id || '');
    return planDAO.deletePlan(id);
}

const updatePlan = (body : Record<string, any>) => {
    const id : mongoose.Types.ObjectId = mongoose.Types.ObjectId(body.id || '');
    const updateData : Record<string, any> = body.updateData || {};
    return planDAO.updatePlan(id, updateData);
}

function getPlanCount ( query: Record<string, any> ) {
    const userId : mongoose.Types.ObjectId = mongoose.Types.ObjectId(query['userId'] || '');

    return planDAO.getPlanCount({"userId": userId});
}

const createPlan  = (body : Record<string, any>) => {
    const userId : mongoose.Types.ObjectId = mongoose.Types.ObjectId(body.userId || '');
    const targetList : [] = body.targetList || [];
    const planType : PlanType = body.type === 'important' ? PlanType.important : PlanType.relaxed ;
    const id : mongoose.Types.ObjectId = mongoose.Types.ObjectId();
    const createTime : Date = new Date();
    const remindDateTime : string = body.remindDateTime || '';
    const name : string = body.name || '';
    const planData : Plan = {
        name: name,
        userId: userId,
        id: id,
        planType: planType,
        createTime: createTime,
        targetList: targetList
    }
    remindDateTime && ( planData.remindDateTime = remindDateTime );
    return planDAO.createPlan(planData);
}

export {
    createPlan,
    getPlanList,
    deletePlan,
    updatePlan,
    getPlanCount
}