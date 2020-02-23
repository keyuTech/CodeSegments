class EventHub {
    events = {};
    on(eventName, fn) {
        if (this.events[eventName] === undefined) {
            this.events[eventName] = []
        }
        this.events[eventName].push(fn)
    }
    emit(eventName) {
        if (this.events[eventName] === undefined) return
        this.events[eventName].forEach(fn => fn())
    }
    off(eventName, fn) {
        if (this.events[eventName] === undefined) return
        const index = this.events[eventName].indexOf(fn)
        index !== -1 && this.events[eventName].splice(index, 1)
    }
}

export default EventHub;
