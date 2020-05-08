import express from 'express';
import baseSend from './baseSend';
import * as baidu from '../controllers/baidu';

const router = express.Router();


router.get('/searchTips', (req, res) => {
    baidu.baiduSearchTips(req.query || '').then(({result}) => {
        console.log("提示",result)
        baseSend({
            req, 
            res,
            data: result
        })
    });
    
})

export default router;