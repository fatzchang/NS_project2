const _ = require('lodash');
const utils = require('./utils');

const isDDoS = (record_count, srcObj, dstObj) => {
    const src_ip_count = _.size(srcObj);
    const top_ip = utils.top_visited_ip(dstObj);

    return (
        (src_ip_count/record_count > 0.1) && // ratio of different source ip and total traffic count
        (top_ip.ports['22'] !== undefined) && // DDoS specify port 22
        (top_ip.ports['22']/top_ip.count > 0.5)
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
//     const max_visited_ip = top_visited_ip(dstObj);

//     console.log(record_count, max_visited_ip.count, _.size(max_visited_ip.ports));

//     return (
//         (max_visited_ip.count/record_count > 0.1) &&
//         (_.size(max_visited_ip.ports)/max_visited_ip.count > 0.05)
//     )
// }

module.exports = {
    isDDoS
}