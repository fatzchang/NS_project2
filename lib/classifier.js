const reader = require('./reader');
const _ = require('lodash');

const isDDoS = (record_count, srcObj) => {
    const src_ip_count = _.size(srcObj);
    return (src_ip_count/record_count > 0.6);
}
const isPortScan = () => {
    
}

const classifier = async (filePath) => {
    const srcObj = {}
    const dstObj = {}
    
    const record_count = await reader(filePath, srcObj, dstObj);
    if (isDDoS(record_count, srcObj)) {
        return "DDoS";
    }
    
    
    return "";
}


module.exports = classifier;