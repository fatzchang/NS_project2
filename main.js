const fs = require('fs');
const path = require('path');
const classifier = require('./lib/classifier');

// default data directory path
let dataDir = "./data";

// get path from command line
const  argv = process.argv.slice(2);
if (argv.length != 0) {
    dataDir = argv[0];
}

fs.readdirSync(dataDir).forEach(logFile => {
    // get absolute path of file
    const filePath = path.resolve(dataDir, logFile);
    const attack_type = classifier(filePath);

    console.log(`${logFile} is attack ${attack_type}`);
})

// classifier("./data/port_scan.json")