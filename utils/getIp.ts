/**获取本机ip**/
function hostIp(){
    const ifaces = require('os').networkInterfaces();
    
    for (let dev in ifaces) {
        var alias = 0;
        for (let index in ifaces[dev]) {
            if (ifaces[dev][index].family=='IPv4') {
                let myip = ifaces[dev][index].address;
                if (dev+(alias ? ':' + alias : '') === 'WLAN') {
                    return myip;
                } 
                console.log(dev+(alias ? ':' + alias : ''), myip);
                alias++;
            }
        }
    }
}

hostIp();

 

const hostname = require("os").hostname();//主机名


export {
    hostname,
    hostIp
}