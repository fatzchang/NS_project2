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

fs.readdirSync(dataDir).forEach(async (logFile) => {
    // get absolute path of file
    const filePath = path.resolve(dataDir, logFile);
    const attack_type = await classifier(filePath);

    console.log(`${logFile}: ${attack_type}`);
})

// classifier("./data/DDoS.json")