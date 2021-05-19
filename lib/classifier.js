const _ = require('lodash');
const reader = require('./reader');
const detector = require('./detector');

const classifier = async (filePath) => {
    const attack_types = ["DDoS", "Ip Scan", "Port Scan", "RDP Brute-Force", "C&C"];
    const srcObj = {}
    const dstObj = {}
    
    const record_count = await reader(filePath, srcObj, dstObj);
    if (detector.isDDoS(record_count, srcObj, dstObj)) {
        return attack_types[0];
    }

    if (detector.isIPScan(record_count, dstObj)) {
        return attack_types[1];
    }

    if (detector.isPortScan(record_count, dstObj)) {
        return attack_types[2];
    }

    if (detector.isRDPBruteForce(record_count, dstObj)) {
        return attack_types[3];
    }

    if (detector.isCNC(dstObj)) {
        return attack_types[4];
    }
    
    // can't determine, just guess!
    return attack_types[_.random(0, 4)];
}


module.exports = classifier;