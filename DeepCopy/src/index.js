const deepCopy = (source) => {
    if (source instanceof Object) {
        let result;
        if (source instanceof Array) {
            result = new Array();
        } else if (source instanceof Function) {
            result = function() {
                return source.apply(this, arguments)
            }
        } else {
            result = new Object()
        }
        for(let key in source) {
            if (result[key]) return;
            result[key] = deepCopy(source[key])
        }
        return result;
    }
    return source;
};

module.exports = deepCopy
