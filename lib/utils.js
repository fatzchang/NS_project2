const _ = require('lodash');

const top_visited_ip = (obj) => {
    const result = _.reduce(obj, function(result, value, key) {
        if (value.count >= result.count) {
            result = value;
        }

        return result;
    }, { count: 0 });

    return result;
}

module.exports = {
    top_visited_ip
};