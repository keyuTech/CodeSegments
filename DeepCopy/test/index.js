const deepCopy = require('../src/index');
const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);

const assert = chai.assert;

describe('deepCopy', () => {
    it('is function', () => {
        assert.isFunction(deepCopy)
    })
    it('可以拷贝基本类型', () => {
        const n = 123
        const n2 = deepCopy(n)
        assert(n2 === n)
        const s = '123456'
        const s2 = deepCopy(s)
        assert(s2 === s)
        const b = true
        const b2 = deepCopy(b)
        assert(b2 === b)
        const u = undefined
        const u2 = deepCopy(u)
        assert(u2 === u)
        const empty = null
        const empty2 = deepCopy(empty)
        assert(empty2 === empty)
        const sym = Symbol()
        const sym2 = deepCopy(sym)
        assert(sym2 === sym)
    })
    describe('object', () => {
        it('能拷贝普通对象', () => {
            const obj = {
                a: {
                    b: 'aaa',
                    c: 111,
                },
                d: 'ccc',
            }
            const obj2 = deepCopy(obj)
            assert(obj !== obj2)
            assert(obj.a !== obj2.a)
            assert(obj.a.b === obj2.a.b)
            assert(obj.a.c === obj2.a.c)
            assert(obj.d === obj2.d)
        })
        it('能拷贝数组', () => {
            const arr = ['arr', 1, [1, 2, undefined]];
            const arr2 = deepCopy(arr);
            assert(arr !== arr2)
            assert(arr[0] === arr2[0])
            assert(arr[1] === arr2[1])
            assert(arr[2] !== arr2[2])
            assert(arr[2][0] === arr2[2][0])
            assert(arr[2][1] === arr2[2][1])
            assert(arr[2][2] === arr2[2][2])
        })
        it('能够拷贝函数', () => {
            const fn = function(a, b) {
                return a + b;
            }
            fn.x = {y: {z: 1}}
            const fn2 = deepCopy(fn)
            assert(fn !== fn2)
            assert(fn.x !== fn2.x)
            assert(fn.x.y !== fn2.x.y)
            assert(fn.x.y.z === fn2.x.y.z)
            assert(fn(1, 2) === fn2(1, 2))
        })
    })
})
