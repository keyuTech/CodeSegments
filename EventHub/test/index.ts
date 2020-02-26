import EventHub from '../src/index';

const fn1 = (x) => {
    console.log('eventHub .on method')
    console.log(x)
}
const fn2 = () => {
    console.log('eventHub .off method')
}

const testEventHub = () => {
    const eventHub = new EventHub
    console.assert(eventHub instanceof Object === true)
}

const testOnMethod = () => {
    const eventHub = new EventHub
    eventHub.on('on', fn1)
}

const testEmitMethod = () => {
    const eventHub = new EventHub
    eventHub.on('on', fn1)
    eventHub.emit('on', 'xxx')
}

const testOffMethod = () => {
    const eventHub = new EventHub
    eventHub.on('on', fn2)
    eventHub.off('off', fn2)
    eventHub.emit('off')
}

testEventHub()
testOnMethod()
testEmitMethod()
testOffMethod()
