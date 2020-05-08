import PlanModel, {Plan, PlanType, PlanState} from '../models/plan';
import mongoose from '../../mongoose';
import { FilterQuery } from 'mongoose';

const createPlan = (planData : Plan) => {
    const plan = new PlanModel(planData);
    return new Promise((resolve, rejects) => {
        plan.save( (err : Error, raw : any) => {
            if (err) {
                rejects(err);
            } else {
                resolve(planData.id);
            }
        })
    })
}


const getPlanCount = (filterQuery : FilterQuery<any>) => {
    return new Promise( (resolve, rejects) => {
        PlanModel.find(filterQuery).count((err : any, total : number) =>{
            if (err) {
                rejects(err);
            }else {
                resolve(total);
            }       
        });
    })
}
const getPlanList =  (userId : string, pageIndex : number, pageSize : number, planState : string, planType: string) => {
    const filterQuery : FilterQuery<any> = {
        "userId": mongoose.Types.ObjectId(userId),
        "state": planState
    }
    planType !== 'all' && (filterQuery.planType = planType);
    return getPlanCount(filterQuery).then((total : any)=> {
        return  new Promise((res, rej) => {
            PlanModel.find(filterQuery)
            .skip((pageIndex - 1) * pageSize)
            .limit(pageSize)
            .exec((err: any, data: any) => {
                if (err) {
                    rej(err);
                }else {
                    res({
                        total,
                        pageIndex,
                        list: data
                    })
                }
            })
        })
    })
}

// 删除一个计划
const deletePlan = (id: mongoose.Types.ObjectId) => {
    return new Promise((resolve, rejects) => {
        PlanModel.deleteOne({"id": id}, (err: any) => {
            if (err) {
                rejects(err);
            }else {
                resolve('success');
            }
        })
    })
}

// 更新一个计划
const updatePlan = (id: mongoose.Types.ObjectId, updateData : Record<string, any>) => {
    return new Promise((resolve, rejects) => {
        PlanModel.update({"id": id}, updateData, (err: any, raw: any) => {
            if (err) {
                rejects(err);
            }else {
                resolve('success');
            }
        })
    })
}

export {
    createPlan,
    getPlanList,
    deletePlan,
    updatePlan,
    getPlanCount
}

