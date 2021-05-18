const reader = require('./reader');

const classifier = async (filePath) => {
    const srcObj = {}
    const dstObj = {}
    
    const record_count = await reader(filePath, srcObj, dstObj);

    console.log(srcObj);
    console.log(dstObj);
    
    return 0;
}

module.exports = classifier;