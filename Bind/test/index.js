const bindX = require('../src/index');
Function.prototype.bindX = bindX;
console.assert(Function.prototype.bindX !== undefined);

const fn1 = function () {
    return this;
};
const fn2 = function (p1, p2) {
    return [this, p1, p2];
};
const newFn1 = fn1.bindX({name: 'frank'});
console.assert(newFn1().name === 'frank');
const newFn2 = fn2.bindX({name: 'frank'}, 1, 2);
console.assert(newFn2()[0].name === 'frank');
console.assert(newFn2()[1] === 1);
console.assert(newFn2()[2] === 2);
