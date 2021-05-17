const fs = require('fs');
const readline = require('readline');

const reader = (filePath, ips, ports) => new Promise((resolve, reject) => {
    // read line by line
    const fileStream = fs.createReadStream(filePath);
    const lineReader = readline.createInterface({ input: fileStream });

    lineReader.on('line', function(line) {
        const lineObject = JSON.parse(line);
        const destination = lineObject._source.destination;
        
        if (destination.ip) {
            if (ips[destination.ip] === undefined) {
                ips[destination.ip] = 0;
            } else {
                ips[destination.ip]++;
            }
        }

        if (destination.port) {
            if (ports[destination.port] == undefined) {
                ports[destination.port] = 0;
            } else {
                ports[destination.port]++;
            }
        }
    }).on('close', function() {
        // assume done without error
        resolve(true);
    });
})


module.exports = reader;
