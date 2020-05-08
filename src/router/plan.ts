import express from 'express';
import baseSend from './baseSend';
import * as planControl from '../controllers/plan'
const router = express.Router();

// 创建一个计划
router.post('/createPlan', function(req, res) {
    planControl.createPlan(req.body).then((data) => {
        baseSend({
            req,
            res,
            data
        })
    })
});

// 获取计划数量
router.get('/getPlanCount', function(req, res) {
    planControl.getPlanCount(req.query).then((data) => {
        baseSend({
            req,
            res,
            data
        })
    })
});

// 删除一个计划
router.post('/deletePlan', function(req, res) {
    console.log('delete');
    planControl.deletePlan(req.body).then((data) => {
        baseSend({
            req,
            res,
            data
        })
    })
});

// 更新一个计划
router.post('/updatePlan', function(req, res) {
    planControl.updatePlan(req.body).then((data) => {
        baseSend({
            req,
            res,
            data
        })
    })
});


// 获取计划列表
router.get('/planList', function(req, res) {
    planControl.getPlanList(req.query).then((data) => {
        baseSend({
            req,
            res,
            data
        })
    })
});






export default router;