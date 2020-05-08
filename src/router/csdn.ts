import express from 'express';
import * as csdn from '../controllers/csdn'
import baseSend from './baseSend';


const router = express.Router();

router.get('/articles', function (req, res :any) {
    const api:string = 'api/articles'
    csdn.getCsdnArticles(api, req.query).then((data: any) => {
        if (typeof data === 'string') {
            baseSend({
                res,
                req,
                data,
                ret: {msg: 'filed', code: 200}
            })
        }else {
            baseSend({
                res,
                req,
                data
            })
        }
        
    })
    
})

router.get('/swiper', (req, res) => {
    csdn.getCsdnSwiper().then((data: any) => {
        baseSend({
            req,
            res,
            data: data
        })
    })
})

router.get('/soHotWord', (req, res) => {
    csdn.getSoHotWord().then((data: any) => {
        baseSend({
            req,
            res,
            data: data
        })
    })
})


export default router;