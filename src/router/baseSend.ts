interface Ret {
    msg: string,
    code: number
}

interface SendData {
    ret: Ret ,
    data: any,
    api: string
}

export interface BaseSendOptions {
    res: any,
    req: any,
    data ?: any,
    ret ?: Ret
}

const baseSend  = function ({res, req, data = '', ret = {msg: 'success', code: 200}}:BaseSendOptions) {
    const result : SendData  = {
        ret: ret,
        data: data,
        api: req.originalUrl || ''
    };
    res.send(result)
}


export default baseSend;