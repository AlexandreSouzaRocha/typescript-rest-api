import event from 'events';

const CustomEventEmitter = new event.EventEmitter();

CustomEventEmitter.setMaxListeners(0);

export default CustomEventEmitter;
