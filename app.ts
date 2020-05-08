import createError from 'http-errors';
import express, {Application, NextFunction, Request, Response} from 'express';
import path from 'path';
import fs from 'fs';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import {rootRouter, usersRouter, csdnRouter, baiduRouter, planRouter, noteRouter } from "./src/router/index";


const app : Application = express();
// 定义一个写入流写入日志
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs/access.log'), {flags: 'a'});

// view engine setup
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'jade');

app.use(logger('common', {stream: accessLogStream}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', rootRouter);
app.use('/user', usersRouter);
app.use('/csdn', csdnRouter);
app.use('/baidu', baiduRouter);
app.use('/plan', planRouter);
app.use('/note', noteRouter);
// catch 404 and forward to error handler
app.use(function(req, res: Response<any>, next:NextFunction) {
  next(createError(404));
});

// error handler
app.use(function(err : any, req : Request, res: Response<any>, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;