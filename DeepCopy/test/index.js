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
        it('能拷贝正则', () => {
            const reg = new RegExp('hi\\d+', 'gi');
            reg.x = {y: {z: 1}}
            const reg2 = deepCopy(reg)
            assert(reg !== reg2)
            assert(reg.x !== reg2.x)
            assert(reg.x.y !== reg2.x.y)
            assert(reg.x.y.z === reg2.x.y.z)
            assert(reg.source === reg2.source)
            assert(reg.flags === reg2.flags)
        })
        it('能拷贝日期', () => {
            const date = new Date()
            date.x = {y: {z: 1}}
            const date2 = deepCopy(date)
            assert(date !== date2)
            assert(date.x !== date2.x)
            assert(date.x.y !== date2.x.y)
            assert(date.x.y.z === date2.x.y.z)
            assert(date.getTime() === date2.getTime())
        })
        it('自动跳过原型', () => {
            const obj = Object.create({name: 'a'})
            obj.x = {y: {z: 1}}
            const obj2 = deepCopy(obj)
            assert(obj !== obj2)
            assert(obj.x !== obj2.x)
            assert(obj.x.y !== obj2.x.y)
            assert(obj.x.y.z === obj2.x.y.z)
            assert.isFalse('name' in obj2)
        })
        it('能拷贝环', () => {
            const obj = {name: 'obj'}
            obj.self = obj
            const obj2 = deepCopy(obj)
            assert(obj !== obj2)
            assert(obj.name === obj.name)
            assert(obj.self !== obj2.self)
        })
    })
})
