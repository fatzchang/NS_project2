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

const top_visited_port_count = (ipObj) => {
    let max_visted_port_count = 0;

    _.forEach(ipObj.ports, (v, k) => {
        if (v > max_visted_port_count) {
            max_visted_port_count = v;
        }
    });

    return max_visted_port_count;
}

module.exports = {
    top_visited_ip,
    top_visited_port_count
};