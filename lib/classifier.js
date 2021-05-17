const reader = require('./reader');

const classifier = async (filePath) => {
    
    const ports = {};
    const ips = {};
    
    await reader(filePath, ips, ports);

    console.log(ips);
    console.log(ports);
    
    return 0;
}

module.exports = classifier;