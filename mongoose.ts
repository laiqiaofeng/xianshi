import mongoose from 'mongoose';

// 连接 URL
const baseURL= 'mongodb://localhost:27017/flutter';
mongoose.set('useCreateIndex', true)
mongoose.connect(baseURL, { useUnifiedTopology: true,useNewUrlParser: true });

// 定义事件 , 不使用箭头函数
mongoose.connection.on('connected', function () {
    console.log('已经成功连接mongoDB, url:' + baseURL);
})

mongoose.connection.on('error', function () {
    console.log('连接发生错误');
})

mongoose.connection.on('disconnected', function () {
    console.log('mongoDB 连接已断开');
})


export default mongoose;