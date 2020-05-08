import fs from 'fs';
import path from 'path';

const deleteFolder = async (url : string ) =>  {
    let files : string[] = [];

    // 判断是否存在该路径
    if (fs.existsSync(url)) {
        if (fs.statSync(url).isDirectory()) {
            // 如果存在， 返回一个文件和子目录的数组
            files = fs.readdirSync(url);

            // 递归遍历
            files.forEach( (item : string, index : number) => {
                const curPath = path.join(url, item);
                if (fs.statSync(curPath).isDirectory()) {
                    deleteFolder(curPath);
                }else {
                    fs.unlinkSync(curPath);
                }
            })
            // 清空文件夹
            fs.unlinkSync(url);
        }else {
            console.log('删除s',url)
            fs.unlinkSync(url);
        }
        
    }else {
        throw new Error('没有该路径');
    }
}


export default deleteFolder;