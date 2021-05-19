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

// group first ip section "xxx".xxx.xxx.xxx
const isIPScan = (record_count, dstObj) => {
    let dst_ip_count = 0, max_port_count = 0;
    const ip_group = {};

    _.forEach(dstObj, (v, k) => {
        if (ip_group[k.substring(0, 3)] === undefined) {
            ip_group[k.substring(0, 3)] = 0;
        }

        ip_group[k.substring(0, 3)]++;
        if (ip_group[k.substring(0, 3)] > max_port_count) {
            max_port_count = ip_group[k.substring(0, 3)];
        }

        dst_ip_count++;
    });


    return (
        dst_ip_count/record_count > 0.01 && 
        (max_port_count/dst_ip_count > 0.5)
    );
}

const isPortScan = (record_count, dstObj) => {
    // find max ip count
    const top_ip = utils.top_visited_ip(dstObj);

    return (
        (top_ip.count/record_count > 0.3) &&
        (_.size(top_ip.ports)/top_ip.count > 0.05)
    )
}

const isRDPBruteForce = (record_count, dstObj) => {
    const top_ip = utils.top_visited_ip(dstObj);
    const top_port_count = utils.top_visited_port_count(top_ip);

    return (
        (top_port_count/top_ip.count > 0.5) &&
        top_ip.ports['3389'] == top_port_count
    )
}

// FIXIT: not precise
const isCNC = (dstObj) => {
    const top_ip = utils.top_visited_ip(dstObj);
    const top_port_count = utils.top_visited_port_count(top_ip);

    // console.log('record count: ', record_count);
    // console.log('top ip count: ', top_ip.count);
    // console.log('top post count: ', top_port_count);

    return (top_port_count/top_ip.count > 0.5);
}

module.exports = {
    isDDoS,
    isIPScan,
    isPortScan,
    isRDPBruteForce,
    isCNC
}