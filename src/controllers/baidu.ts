import Https from 'https';
import url from 'url';
function baiduSearchTips (value: string = '') : Promise<any> {
    let val = encodeURIComponent(value);
    const soUrl : string = `https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&sugsid=30969,1443,31326,21080,31424,31342,31271,31229,30824,31164,22158&wd=${val}&req=2&bs=${val}&pbs=${val}&csor=7&cb=jQuery110205507078566807553_1587834454581&_=1587834454716`;
    return new Promise((resolve: Function, rejects: Function) => {
        Https.get(soUrl,{
            method: 'GET',
            // encoding: null,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36',
                'server': 'openresty'
            }
        }, (res) => {
            let datas : any[] = [];
            let size = 0;
            res.on('data', function (data) {  
                datas.push(data);  
                size += data.length;  
                
            });
            res.on('end', () => {
                let tipData : string = datas[0].toString();
                tipData = tipData.replace(/jQuery110205507078566807553_1587834454581\(/, '').replace(/\)/, '').replace(/\[object object\]/g, '');
                console.log('请求', tipData);
                let result : Record<string, any>[] = [];
                if (tipData) {
                    const jsonString = JSON.parse(tipData);
                    // result = JSON.parse(jsonString);
                    result = jsonString.g
                    resolve({res, result})
                }else {
                    resolve({res, result: ''})
                }
            })
        })
    })
    
}

export {
    baiduSearchTips
}