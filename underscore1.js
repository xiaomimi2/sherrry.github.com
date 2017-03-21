(function(){
	var root = this;
	var previouseUnderscore = root._;
	var ArrayProto = Array.prototype , ObjProto = obj.prototype, FuncProto = Function.prototype;

	var push = ArrayProto.push,
		slice = ArrayProto.slice,
		toString = ObjProto.toString,
		hasOwnProperty = ObjProto.hasOwnProperty；

	var 
		nativeIsArray = ArrayProto.isArray,
		nativeKeys = Object.keys,
		nativeBind = FuncProto.bind,
		nativeCreate = Object.create;

	var Ctor = function(){};

	var _ = function(obj){
		if( obj isntanceof _) return obj;
		if(!(this instanceof _)) return new _(obj);//this的原型链是不是指向——这个构造函数的原型。
		this._wrapped = obj;
	}


}).call(this);