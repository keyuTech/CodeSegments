class EventHub {
    private events: {[key: string]: Array<Function>} = {};
    on(eventName: string, fn: Function) {
        if (this.events[eventName] === undefined) {
            this.events[eventName] = []
        }
        this.events[eventName].push(fn)
    }
    emit(eventName: string, data?: unknown) {
        const eventList = this.events[eventName];
        if (eventList === undefined) return;
        eventList.forEach((fn: Function) => fn(data))
    }
    off(eventName: string, fn: Function) {
        const eventList = this.events[eventName];
        if (eventList === undefined) return;
        const index = eventList.indexOf(fn);
        index !== -1 && eventList.splice(index, 1)
    }
}

export default EventHub;
