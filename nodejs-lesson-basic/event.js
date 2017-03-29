var events = require('events')
var emitter = new events.EventEmitter()
emitter.on("newListener",function(event,listener){
	console.log(event + "is Added")
})

emitter.on("removeListener",function(event,listener){
	console.log(event+" 的 "+listener + "is been removed" )
})
var listener1 = function(){
	console.log("first connection emitted")
}

var listener2 =function(){
	console.log("second connection emitted")
}
emitter.addListener('connection',listener1)

emitter.on('connection',listener2)


emitter.once('test',function(){
	console.log("test is emitted")
})

emitter.on('play',function(){
	console.log("play started");
	var eventListeners = events.EventEmitter.listenerCount(emitter,'connection');
	console.log(eventListeners +"个监听器在connection上");
	emitter.emit("connection");
	emitter.emit("test");
	emitter.removeListener("connection",listener2);
	emitter.emit("test")
    eventListeners = events.EventEmitter.listenerCount(emitter,'connection');
    console.log(eventListeners +"个监听器在connection上");
})


emitter.emit("play");
console.log("程序执行完毕")