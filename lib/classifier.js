const reader = require('./reader');
const _ = require('lodash');

const max_count_ip = (obj) => {
    const result = _.reduce(obj, function(result, value, key) {
        if (value.count >= result.count) {
            result = value;
        }

        return result;
    }, { count: 0 });

    return result;
}

const isDDoS = (record_count, srcObj, dstObj) => {
    const src_ip_count = _.size(srcObj);
    const max_visited_ip = max_count_ip(dstObj);

    return (
        (src_ip_count/record_count > 0.1) &&
        (max_visited_ip.ports['22'] !== undefined) &&
        (max_visited_ip.ports['22']/max_visited_ip.count > 0.5)
    );
}

// FIXIT: 192.168.x.x
// const isIPScan = (record_count, dstObj) => {
//     console.log('IP Scan log:');
//     const dst_ip_count = _.size(dstObj);
//     return (dst_ip_count/record_count > 0.05);
// }


// const isPortScan = (record_count, dstObj) => {
//     console.log('Port Scan log:');
//     // find max ip count
//     const max_visited_ip = max_count_ip(dstObj);

//     console.log(record_count, max_visited_ip.count, _.size(max_visited_ip.ports));

//     return (
//         (max_visited_ip.count/record_count > 0.1) &&
//         (_.size(max_visited_ip.ports)/max_visited_ip.count > 0.05)
//     )
// }

const classifier = async (filePath) => {
    const srcObj = {}
    const dstObj = {}
    
    const record_count = await reader(filePath, srcObj, dstObj);
    if (isDDoS(record_count, srcObj, dstObj)) {
        return "DDoS";
    }

    // if (isIPScan(record_count, dstObj)) {
    //     return "Ip Scan"
    // }

    // if (isPortScan(record_count, dstObj)) {
    //     return "Port Scan"
    // }
    
    
    return "";
}


module.exports = classifier;