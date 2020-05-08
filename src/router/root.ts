import express from 'express';
import { recordLog } from '../controllers/log'
import baseSend from './baseSend';
import multiparty from 'multiparty';
import { modifyUserInfo, queryUserById } from '../controllers/user';
import { updateNote} from '../controllers/note';
import deleteFolder from '../../utils/deleteFolder';
import url from 'url';
import { UserInfoData } from '../models/user_info';

const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('root');
});


// 收集日志
router.get('/log', function(req, res) {
  let msg : string = req.body.msg || '';
  recordLog(msg).then(() =>{
      baseSend({
          req,
          res,
          data: 'success'
      })
  })
});

router.post('/upLoad', function async (req, res)  {
  const form = new multiparty.Form({ uploadDir: './public/images' });
  form.parse(req, async function(err : Error, fields : any, files: any) {
      const tag : string = fields['tag'][0];
      const type : string = fields['type'][0];
      const originUrl = req.headers.host
      const publicUrl : string = files.file[0]!.path;
      const imgUrl : string = url.resolve(`http://${originUrl}`, publicUrl.replace(/public\\/g, '') )
      const id : string = fields['id'][0];
      if (err) {
        console.log('失败')
      } else {
        if (type === 'user') {
          const userInfo : any =  await queryUserById(id, {
            select: [tag]
          });
  
          const oldImgUrl : string = userInfo!.avatarUrl || '';
  
          modifyUserInfo({
            "id": id,
            "userInfo": {
              [tag] : imgUrl 
            }
          }).then((data) => {
            if (oldImgUrl) {
              const oldUrl = `public/${oldImgUrl.substring(oldImgUrl.indexOf('images/'), oldImgUrl.length)}`
              console.log('oldUrl', oldUrl);
              deleteFolder(oldUrl);
            }
            baseSend({
              req,
              res,
              data: data
            });
          });
        } else if (type === 'noteImageShare') {
          updateNote({
            "noteId": id,
            "update": {
              [tag] : imgUrl 
            }
          }).then(data => {
            baseSend({
              req,
              res,
              data: imgUrl
            });
          })
        }else {
          baseSend({
            req,
            res,
            data: imgUrl
          });
        }
        
       
      }
  });
  
});

export default router;