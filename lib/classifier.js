const _ = require('lodash');
const reader = require('./reader');
const detector = require('./detector');

const classifier = async (filePath) => {
    const srcObj = {}
    const dstObj = {}
    
    const record_count = await reader(filePath, srcObj, dstObj);
    if (detector.isDDoS(record_count, srcObj, dstObj)) {
        return "DDoS";
    }

    if (detector.isIPScan(record_count, dstObj)) {
        return "Ip Scan"
    }

    // if (isPortScan(record_count, dstObj)) {
    //     return "Port Scan"
    // }
    
    
    return "";
}


module.exports = classifier;