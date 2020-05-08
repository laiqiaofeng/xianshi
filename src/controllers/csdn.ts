import request from 'request';
import iconv from 'iconv-lite';
import cheerio from 'cheerio';
import { Promise } from 'mongoose';

export interface SwiperItem {
    articleUrl?: String,
    imgUrl?: String,
    title?: String
}

function getCsdnData(api: string = '', params: Record<string, any> = {}) {
    const csdngUrl = 'https://www.csdn.net/'
    return new Promise((resolve : Function, reject: Function) => {
        // type=more&category=home&shown_offset=0
        console.log(`${csdngUrl}${api}?type=${params.type}&category=${params.category}&shown_offset=0`);
        request({
            url: `${csdngUrl}${api}?type=${params.type}&category=${params.category}&shown_offset=0`,
            method: 'GET',
            encoding: null,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36',
                'server': 'openresty'
            }
        }, (err, res, body) => {
            if( err ) {
                reject(err);
            } else {
                resolve({res, body});
            }
        });
    })
}


const parsePage = function (api: string = '',callback :Function, isUtf8: boolean = true) {
    return getCsdnData(api).then((urlData: any) => {
        // 如果网站是GBK的话通过iconv转译
        let parseData;
        if (!isUtf8) {
            parseData = iconv.decode(urlData.body, 'gbk')
        }else {
            parseData = urlData.body;
        }
        const querySelector = cheerio.load(parseData);
        return callback(querySelector, parseData, urlData);
    }).catch((e:Error) => console.log(e.message))
} 

const parseApi = function (api: string = '',callback :Function, params: Record<string ,any> = {}) {
    return getCsdnData(api, params).then((urlData: any) => {
        // const data = Buffer.alloc(urlData.body);
        return callback(JSON.parse(urlData.body));
    }).catch((e: Error) => console.log(e.message))
}


function getCsdnArticles (api : string = '', params: Record<string, any>) {
    console.log(params)
    return parseApi(api, ( data : any) => {
        if (data.status) {
            return data.articles
        } else {
            return data.message
        }
    }, params)
}

function getCsdnSwiper () {
    return parsePage('', function ($ : any) {
        const list: Object[] = [];
        $('.carousel-inner >  .carousel-item').each(function(this:any, index : number)  {
            const obj: SwiperItem = {};
            if (index >= 5) return
            obj.articleUrl = $(this).find('a')[0].attribs.href;
            obj.title = $(this).find('div.carousel-caption').text().replace(/\n\t/g, '').trim();
            obj.imgUrl = $(this).find('img')[0].attribs.src;
            list.push(obj);
        })
        return list;
    })
}

function getSoHotWord () {
    const api = 'https://redisdatarecall.csdn.net/recommend/soHotWord';
    return new Promise((resolve: Function, reject: Function) => {
        request({
            url: api,
            method: 'GET',
            encoding: null,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36',
                'server': 'openresty'
            }
        }, (err, res, body) => {
            if( err ) {
                reject(err);
            } else {
                const json = JSON.parse(body);
                resolve(json.data);
            }
        });
    })
}
export {
    getCsdnArticles,
    getCsdnSwiper,
    getSoHotWord
}