const fs = require('fs');
const readline = require('readline');

const reader = (filePath, srcObj, dstObj) => new Promise((resolve, reject) => {
    // read line by line
    const fileStream = fs.createReadStream(filePath);
    const lineReader = readline.createInterface({ input: fileStream });
    let record_count = 0;

    lineReader.on('line', function(line) {
        const lineObject = JSON.parse(line);
        const destination = lineObject._source.destination;
        const source = lineObject._source.source;

        // group source
        if (source.ip && source.port) {
            // initialize ip
            if (srcObj[source.ip] === undefined) {
                srcObj[source.ip] = {
                    count: 0,
                    ports: {}
                }
            }

            srcObj[source.ip].count++;

            // initialize port
            if (srcObj[source.ip].ports[source.port] === undefined) {
                srcObj[source.ip].ports[source.port] = 0;
            }

            srcObj[source.ip].ports[source.port]++;
        }

        
        if (destination.ip && destination.port) {
            if (dstObj[destination.ip] === undefined) {
                dstObj[destination.ip] = {
                    count: 0,
                    ports: {}
                }
            } 

            dstObj[destination.ip].count++;

            if (dstObj[destination.ip].ports[destination.port] === undefined) {
                dstObj[destination.ip].ports[destination.port] = 0
            }

            dstObj[destination.ip].ports[destination.port]++;
        }

        record_count++;
    }).on('close', function() {
        // assume done without error
        resolve(record_count);
    });
})


module.exports = reader;
