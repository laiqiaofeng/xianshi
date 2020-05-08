import express from 'express';
import baseSend from './baseSend';
import * as noteControl from '../controllers/note';
import multiparty from 'multiparty';
import url from 'url';
import deleteFolder from '../../utils/deleteFolder';
const router = express.Router();


router.post('/createNote', (req, res) => {
    const form = new multiparty.Form({ uploadDir: './public/images' });
    // noteControl.createNote();
    form.parse(req, async function(err : Error, fields : any, files: any) {
        if (files.file) {
            const originUrl = req.headers.host;
            const publicUrl : string = files.file[0]!.path;
            const imgUrl : string = url.resolve(`http://${originUrl}`, publicUrl.replace(/public\\/g, '') )
            if (err) {
            console.log('失败')
            } else {
            noteControl.createNote(fields, imgUrl)
            .then((data) => {
                baseSend({
                    req,
                    res,
                    data
                });
            })
            .catch((err) => {
                const oldUrl = `public/${imgUrl.substring(imgUrl.indexOf('images/'), imgUrl.length)}`
                deleteFolder(oldUrl);
            })
            }
        }else {
            noteControl.createNote(fields, '')
            .then((data) => {
                baseSend({
                    req,
                    res,
                    data
                });
            })
        }
        
    });
})


router.get('/getNoteList', (req, res) => {
    noteControl.getNoteList(req.query).then((data) =>{
        console.log('noteList', data);
        baseSend({
            req,
            res,
            data
        })
    });
})

router.post('/deleteNote', (req, res) => {
    noteControl.deleteNote(req.body).then((data) => {
        if (data === 'success') {
            baseSend({
                req,
                res,
                data
            })
        }
    })
})

// 获取计划数量
router.get('/getNoteCount', function(req, res) {
    console.log('执行了吗')
    noteControl.getNoteCount(req.query).then((data) => {
        console.log('这里的data是', data);
        baseSend({
            req,
            res,
            data
        })
    })
});

export default router;