import express from 'express';
import * as userControl from '../controllers/user';
import baseSend from './baseSend';


const router = express.Router();
/**
 * 校验用户登录
 */
router.post('/validateLogin', function(req, res) {
  userControl.queryUser(req.body).then((data: string) => {
    baseSend({
      res,
      req,
      data: data
    });
  })
});

// 获取用户信息
router.get('/getUserInfo', function (req, res) {
  userControl.getUserInfo(req.query).then((data) => {
    baseSend({
      res,
      req,
      data: data
    })
  } )
})

// 修改用户信息
router.post('/modifyUserInfo', function (req, res) {
  console.log('已经接收到请求');
  userControl.modifyUserInfo(req.body).then((data: any) => {
    baseSend({
      res,
      req,
      data: data
    })
  } )
})

// 修改用户密码

router.get('/updatePassword', (req, res) => {
  userControl.updatePassword(req.query).then((data : any) => {
    baseSend({
      res,
      req,
      data: data
    });
  })
});
/**
 * 注册用户
 */
router.post('/register', function (req, res) {
  console.log('register');
  userControl.addUser(req.body,).then(() => {
    baseSend({
      res,
      req,
      data: '成功'
    });
  }, (err:Error) => {
    baseSend({
      res,
      req,
      data: err.message
    });
  });
  
});

export default router;