import fs from 'fs';


function recordLog (msg : String) {
    return new Promise((resolve, rejects) => {
        console.log("msg", msg);
        fs.writeFile('../../logs/app_log.log', msg, function (err : Error | null) : void {
            if (err) {
                resolve('success');
            }else {
                rejects(err);
            }
        });
    });
}


export {
    recordLog
}