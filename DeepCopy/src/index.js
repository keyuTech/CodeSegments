let cache = [];
const deepCopy = (source) => {
    if (source instanceof Object) {
        let cachedResult = findCache(source)
        if (cachedResult) {
            return cachedResult
        } else {
            let result;
            if (source instanceof Array) {
                result = new Array();
            } else if (source instanceof Function) {
                result = function() {
                    return source.apply(this, arguments)
                }
            } else if (source instanceof RegExp) {
                result = new RegExp(source.source, source.flags)
            } else if (source instanceof Date) {
                result = new Date(source)
            } else {
                result = new Object()
            }
            cache.push([source, result])
            for(let key in source) {
                if (source.hasOwnProperty(key)) {
                    if (result[key]) return;
                    result[key] = deepCopy(source[key])
                }
            }
            return result;
        }
    }
    return source;
};

function findCache(source) {
    for(let i = 0; i < cache.length; i++) {
        if (cache[i][0] === source) {
            return cache[i][1]
        }
    }
    return undefined;
}

module.exports = deepCopy
