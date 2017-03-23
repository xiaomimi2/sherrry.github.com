//unicode是为了解决传统的字符编码方案的局限而产生的。二进制
//unicode是国际组织制定的可以容纳世界上所有文字和符号的字符编码方案
//UTF-8,UTF-16,UTF-32都是将数字转换到程序数据的编码方案。
//Unicode编码（十六进制） UTF-8（二进制）
// var runInContext = (function runInContext(context){});
// var _ = runInContext()
/**
 *
 * @param map
 * @param pair key-value pair
 * @returns {*}
 */
function addMapEntry(map,pair){
	map.set(pair[0],pair[1]);
	return map;
}
/**
 *
 * @param array
 * @param setter
 * @param iteratee 迭代器
 * @param accumulator
 */
function arrayAggregator(array,setter,iteratee,accumulator){
	var index = -1,
		length = arry == null ? 0 : array.length;
	while(++index < length){
		var value = array[index];
		setter(accumulator,value,iteratee(value),array);
	}
	return accumulator;
}
/**
 * 自带
 * @type {[type]}
 */
var Array = context.Array,
	Date = context.Date,
	Error = context.Error,
	Function = context.Function,
	Math = context.Math,
	Object = context.Object,
	RegExp = context.RegExp,
	String = context.String,
	TypeError = context.TypeError

var ArrayProto = Array.prototype,
	funcProto = Function.prototype,
	objectProto = Obejct.prototype;

var nativeCeil = Math.ceil,
	nativeFloor = Math.floor,
	nativeGetSymbols = Object.getOwePropertySymbols,
	nativeBuffer = Buffer? Buffer.isBuffer : undefined,
	nativeIsFinite = context.isFinite,
	nativeJoin = arrayProto.join,
	nativeKeys = overArg(Object.keys,Object),
	nativeMax = Math.max,
	nativeMin = Math.min,
	nativeNow = Date.now,
	nativeParseInt = context.parseInt,
	nativeRandom = Math.random,
	nativeReverse = ArrayProto.reverse;

//true document.body.children 'abc'
function isArrayLike(value){
	return value!=null && isLength(value.length) && !isFunction(value)
}

//typeof NaN  === "number"  一个自然数。非NAN
function isLength(value){
	return typeof value === "number" && value > -1 && value <= MAX_SAFE_INTEGER;
}

var reIsUint = /^(?:0|[1-9]\d*)$/ //自然数
/**
 * [isIndex description] value值小于length 判断是不是整数
 * @param  {[type]}  value  [description]
 * @param  {[type]}  length [description] length 不指定默认是最大safe数值。
 * @return {Boolean}        [description] 判断类型
 */
function isIndex(value,length){
	length = length == null? MAX_SAFE_INTEGER : length;
	return !!length && 
	//value 可能是字符串。
	(typeof value == 'number' || reIsUint.test(value))&&
	(value > -1 && value % 1 == 0 && value < length);
}

/**
 * [isObejct description] 非null的object,根据typeof判断
 * @param  {[type]}  value [description]
 * @return {Boolean}       [description]
 */
function isObejct(value){
	var type = typeof value;
	return value !=null &&(type == 'object' || type == "function")
}
/**
 * [isIterateeCall description] 
 * @param  {[type]}  value  [description]
 * @param  {[type]}  index  [description]
 * @param  {[type]}  object [description]
 * @return {Boolean}        [description]  返回布尔值
 */
function isIterateeCall(value,index,object){
	if(!isObject(object)){
		return false
	}

	var type = typeof index;
	if(type == 'number' 
		?(isArrayLike(object) && isIndex(index,object.length))
		:(type == 'string' && index in object)
		){
		return eq(object[index],value)
	}
	return false;
}
/**
 * [chunk description] 将一个数组分割成固定size的数组。
 * @param  {[type]} array [description]
 * @param  {[type]} size  [description]
 * @param  {[type]} guard [description]
 * @return {[type]}  数组   [description] 分割完成的数组。
 */
function chunk(array,size,guard){
	//guard[size] == array guard是对象或数组
	if((guard?isIterateeCall(array,size,guard) : size === undefined)){
		size = 1;
	}else{
		size = nativeMax(toInteger(size),0);
	}
	var length = array == null? 0 : array.length;
	if(!length || size < 1){
		return [];
	}
	var index = 0,
		resIndex = 0,
		result = Array(nativeCeil(length/size))

	while(index < length){
		result[resIndex++] = baseSlice(array,index,(index += size))
	}
	return result;
}

/**
 * NaN也可以相等。其他满足全等
 * @param value
 * @param other
 * @returns {boolean}
 */
function eq(value,other){
	return value === other || (value !== value && other !== other)
}

/**
 * 根据隐式类型转换的方法来去除undefined,false,0,null,''等
 * @param array
 * @returns {Array}
 */
function compact(array){
	var index = -1,
		length = array == null? 0 : array.length,
		resIndex = 0,
		result = [];
	while (++index < length){
		var value = array[index];
		if(value){
			result[resIndex++] = value;
		}
	}
	return result;
}
/**
 *
 * @returns {*}
 */
function concat(){
	var length = arguments.length;
	if(!length){
		return [];
	}
	var args = Array(length - 1),
		array = arguments[0],
		index = length;
	while(index--){
		args[index-1] = arguments[index]
	}
	//copyArray是为了不直接改变原数组
	return arrayPush(isArray(array)? copyArray(array) : [array],baseFlatten(args,1));
}
/**
 * copyArray([1,3],[12,3,5])  结果是[1,3,5] 覆盖的结果
 * @param source
 * @param array
 * @returns {*}
 */
function copyArray(source,array){
	var index = -1,
		length = source.length;
	array || (array = Array(length));//没有array就创建一个空的array
	while(++index < length){
		array[index] = source[index]
	}
	return array;
}
/**
 * 后面数组继续push到前面的数组中。
 * @param array
 * @param values 必须是数组
 * @returns {*}
 */
function arrayPush(array,values){
	var index = -1,
		length = values.length,
		offset = array.length;
	while(++index < length){
		array[offset+index] = values[index];
	}
	return array;
}
/**
 *
 * @param array
 * @param depth 数组嵌套层次
 * @param predicate 对象
 * @param isStrict 决定在没有嵌套层次的时候可不可以直接插入
 * @param result
 * @returns {*}
 */
function baseFlatten(array,depth,predicate,isStrict,result){
	var index = -1,
		length = array.length;
	predicate || (predicate = isFlattenable);
	result || (result = []);
	while(++index < length){
		var value = array[index];
		if(depth > 0 && predicate(value)){
			if(depth > 1){
				baseFlatten(value,depth-1,predicate,isStrict,result);
			}else{
				arrayPush(result,value)
			}
		}else if(!isStrict){
			result[result.length] = value;
		}
	}
	return result;
}

/**
 * 根据typeof 判定的object
 * @param value
 * @returns {boolean}
 */
function isObjectLike(value){
	return value !=null && typeof value == 'object';
}
/**
 * 类数组对象
 * @param value
 * @returns {boolean}
 */
function isArrayLikeObject(value){
	return isObjectLike(value) && isArrayLike(value);
}

/**
 * 直接查找的方式。不知道为什么不用indexOf的方法?兼容性的问题？
 * @param array
 * @param value
 * @param fromIndex
 * @returns {number}
 */
function strictIndexOf(array,value,fromIndex){
	var index = fromIndex - 1,
		length = array.length;
	while(++index < length){
		if(array[index] === value){
			return index;
		}
	}
	return -1;
}
/**
 * 如果不是基本类型，是比如NaN,无法全等的数值这里也默认相等，并返回index值。
 * @param array
 * @param predicate
 * @param fromIndex
 * @param fromRight
 * @returns {*}
 */
function baseFindIndex(array,predicate,fromIndex,fromRight){
	var length = array.length,
		index = fromIndex+(fromRight?1:-1);
	while((formRight ? index-- : index++) < length){
		if(predicate(array[index],index,array)){
			return index;
		}
		return -1;
	}
}
/**
 * 正对的是二维以上的数组的其中的第一项进行比较得出结果
 * @param array
 * @param key
 * @returns {*}
 */
function assocIndexOf(array,key){
	var length = array.length;
	while(length--){
		if(eq(array[length][0],key)){
			return length;
		}
	}
	return -1;
}
/**
 * 判断是不是NaN
 * @param value
 * @returns {boolean}
 */
function baseIsNaN(value){
	return value !== value;
}
/**
 * 查找某一项是否在数组中
 * @param array
 * @param value
 * @param fromIndex 开始查找的位置
 * @returns {*}
 */
function baseIndexOf(array,value,fromIndex){
	return value === value
		?strictIndexOf(array,value,fromIndex)
		:baseFindIndex(array,baseIsNaN,fromIndex);
}
/**
 * 数组中包括此项
 * @param array
 * @param value
 * @returns {boolean}
 */
function arrayIncludes(array,value){
	var length = array == null? 0 : array.length;
	return !!length && baseIndexOf(array,value,0)>-1;
}

/**
 * 对数组的每一项都执行某些操作，返回操作后的数组。和原生的map方式类似，返回一个新的数组，IE8下不支持
 * @param array
 * @param iteratee
 * @returns {*}
 */
function arrayMap(array,iteratee){
	var index = -1,
		length = array == null ? 0 : array.length,
		result = Array(length);
	while(++index < length){
		result[index] = iteratee(array[index],index,array);
	}
	return result;
}

/**
 * 返回值是函数，返回值传入参数后执行。好处是可以之后传参执行函数
 * @param func
 * @returns {Function}
 */
function baseUnary(func){
	return function(value){
		return func(value);
	}
}

/**
 * 只要在array中有一项与value值通过comparator函数进行比较相等就返回true,否则返回false
 * @param array
 * @param value
 * @param comparator
 * @returns {boolean}
 */
function arrayIncludeWith(array,value,comparator){
	var index = -1,
		length = array == null ? 0 : array.length;
	while(++index < length){
		if(comparator(value,array[index])){
			return true
		}
	}
	return false;
}

/**
 * has方法
 * @param cache
 * @param key
 * @returns {*|boolean|number}
 */
function cacheHas(cache,key){
	return cache.has(key);
}

/**
 * value是基本类型的话，判断是否是__proto__.如果没有trueo或者value===null 也是true
 * 其实就是排除了对象。__proto__不是所有浏览器兼容的。在支持此属性的浏览器上是基本每个类型都有的，只要不是内置对象。
 * @param value
 * @returns {boolean}
 */
function isKeyable(value){
	var type = typeof value;
	return (type == 'string' || type == 'number' || type== "symbol" || type == "bollean")
	? (value !== '__proto__')
	: (value === null)
}
/**
 * 这个和MapHash一模一样
 * {
 * 		__data__:{},
 * 		size:0,
 	* 	set,
 	    delete,
 	    has,
 	    get,
 * 		clear
 * }
 * @param entries
 * @constructor
 */
function Hash(entries){
	var index = -1,
		length = entries == null ? 0 : entries.length;
	this.clear();
	while(++index < length){
		var entry = entries[index];
		this.set(entry[0],entry[1]);
	}
}

/**
 * __data__对象重置为空对象。size= 0
 */
function hashClear(){
	this.__data__ = nativeCreate ? nativeCreate(null) : {};
	this.size = 0;

}

/**
 * 如果是存在Object.create方法，那么__data__是通过Object.create(null)的方法创建，不会有原型链。
 * 所以直接去key值就好。这里可key值要求的是本身自带的，不是通过原型链获取的值。
 * @param key
 * @returns {undefined}
 */
function hashGET(key){
	var data = this.__data__;
	if(nativeCreate){
		var result = data[key];
		return result === HASH_UNDEFINED ? undefined : result;
	}
	return hasOwnProperty.call(data,key) ? data[key] : undefined;
}
/**
 * 和hash的get方法异曲同工，只是这里是返回的布尔值
 * @param key
 * @returns {boolean}
 */
function hashHas(key){
	var data = this.__data__;
	return nativeCreate ? (data[key] !== undefined): hasOwnProperty.call(data,key);
}

/**
 *
 * @param key
 * @param value
 * @returns {hashSet} 最后return了hash对象
 */
function hashSet(key,value){
	var data = this.__data__;
	this.size + this.has(key) ? 0 : 1;
	//HASH_UNDEFINED = '__lodash_hash_undefined__';这里满足了是nativeCreate的条件下才有自定义的undefined
	data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
	return this;
}
/**
 *从__data__中删除一项满足的key值。__data__就是简单的data对象
 * @param key
 * @returns {boolean|number|*}
 */
function hashDelete(key){
	var result = this.has(key) && delete this.__data__[key];
	this.size -= result ? 1 : 0;
	return result;
}


Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGET;
Hash.prototype.set = hashSet;
Hash.prototype.has = hashHas;


/**
 * listCache,MapCache,Hash三者的构造函数雷同
 * entries是每一个子项都是包含了键值对的数组,分别包括了key,value
 * @param entries
 */
function ListCache(entries){
	var index = -1,
		length = entries == null ? 0 : entries.length;
	while(++index < length){
		var entry = entries[index];
		this.set(entry[0],entry[1])
	}
}
/**
 * listCache的__data__是一个数组，包括了一个size
 */
function listCacheClear(){
	this.__data__ = [];
	this.size = 0;
}

function listCacheDelete(key){
	var data = this.__data__,
		//这是从data的末尾向前查找，且是子项中的第一项与key值进行比较
		index = assocIndexOf(data,key);
	if(index < 0){
		return false;
	}
	var lastIndex = data.length - 1;
	//如果是数组最后一项，直接推出这一项就可以
	if(index == lastIndex){
		data.drop();
	}else{
		splice.call(data,index,1);
	}
	--this.size;
	return true;
}

/**
 * ListCache __data__ 的格式[[key,value],[key,value]],所以这里去index子项的第1箱才是结果的值。
 * @param key
 * @returns {undefined}
 */
function listCacheGet(key){
	var data= this.__data__,
		index = assocIndexOf(data,key);
	return index < 0 ? undefined : data[index][1];
}
/**
 *
 * @param key
 * @returns {boolean}
 */
function listCacheHas(key){
	return assocIndexOf(this.__data__,key) > -1;
}
/**
 *
 * @param key
 * @param value
 * @returns {listCacheSet} return了this对象
 */
function listCacheSet(key,value){
	var data = this.__data__,
		index = assocIndexOf(data,key);
	if(index < 0){
		++this.size;
		data.push([key,value]);
	}else{
		data[index][1] = value;
	}
	return this;
}
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;
/**
 * 感觉这个entries的子项也是数组
 * @param entries
 * @constructor
 */
function MapCache(entries){
	var index = -1,
		length = entries == null ? 0 : entries.length;
	this.clear();
	while(++index < length){
		var entry = entries[index];
		this.set(entry[0],entry[1]);
	}
}
/**
 * MapCache原型方法clear
 */
function mapCacheClear(){
	this.size = 0;
	this.__data__ = {
		'hash':new Hash,
		'map' : new (Map || listCache),
		'string' : new Hash
	}
}
/**
 *
 * @param map
 * @param key
 * @returns {*}返回data['string'],data['hash'],data['map']中的一个。
 */
function getMapData(map,key){
	var data = map.__data__;
	//key是基本类型或者是null为true,否则是false
	return isKeyable(key)
		? data[typeof key == 'string' ? 'string' : 'hash']
		: data.map;
}
/**
 * MapCache原型方法delete
 * @param key
 * @returns {*}
 */
function mapCacheDelete(key){
	var result = getMapData(this,key)['delete'](key);
	this.size -= result ? 1 : 0;
	return result;
}
/**
 * MapCache原型方法get
 * @param key
 * @returns {*}
 */
function mapCacheGet(key){
	return getMapData(this,key).get(key);
}



MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 * 结构是
 * {
 * 	 __data__:{
* 	   		__data__:{
	* 	   		'hash':new Hash, //__data__是对象
				'map' : new (Map || listCache),//listCache __data__是二位数组格式
				'string' : new Hash
* 	  		 },
 * 	  		 size:0,
 * 	  		clear:function,
 * 	  		set:function,
 * 	  		get:function,
 * 	  		has:function,
 * 	  		delete:function
 * 	 },
 * 	 size:0,
 * 	 add:function,//调用MapCache的set方法//在通过作用域链调用hash或者listCache的对应set方法。
 * 	 has:function,//调用MapCache的has方法
 *
 * }
 * @param values
 */
function SetCache(values){
	var index = -1,
		length = values == null? 0 : values.length;
	this.__data__ = new MapCache;
	while(++index < length){
		this.add(values[index]);
	}
}

function setCacheAdd(value){
	this.__data__.set(value,HASH_UNDEFINED);
	return this;
}

function setCacheHas(value){
	return this.__data__.has(value);
}

SetCache.prototype.add = SetCache.prototype.push =  setCacheAdd;
SetCache.prototype.has = setCacheHas;
/**
 *
 * @param array
 * @param values
 * @param iteratee
 * @param comparator
 * @returns {Array}
 */
function baseDifference(array,values,iteratee,comparator){
	var index = -1,
		includes = arrayIncludes,
		isCommon =true,
		length = array.length,
		result = [],
		valuesLength = values.length;
	//array不是类数组或者length是0,返回一个空数组
	if(!length){
		return result;
	}
	//如果有迭代器
	if(iteratee){
		//iteratee的参数是values[i],i,values
		values = arrayMap(values,baseUnary(iteratee))
	}

	if(comparator){
		includes = arrayIncludeWith;
		isCommon = false;
		//LARGE_ARRAY_SIZE=200
	}else if(values.length >= LARGE_ARRAY_SIZE){
		includes = cacheHas;
		isCommon = false;
		values = new SetCache(values)
	}
	outer://跳出的标记
	while(++index < length){
		var value = array[index],
			//签名对values中的每一项已经迭代过了，不是很明白这里还迭代是为了什么
			computed = iteratee == null? value : iteratee(value);//这里只给iteratee传了一个参数
		value = (comparator || value !== 0)? value : 0;
		if(isCommon && computed === computed){
			var valuesIndex = valuesLength;
			while(valuesIndex--){
				if(values[valuesIndex] === computed){
					continue outer;//这个outer的设置是为了跳出多层循环吗？
				}
			}
			result.push(value);
			//array,value,comparator
		}else if(!includes(values,computed,comparator)){
			result.push(value);
		}
		return result;

	}
}
var difference = baseRest(function(array,values){
	return isArrayLikeObject(array)
		? baseDifference(array,baseFlatten(values,1,isArrayLikeObject,true))
		:[];
})

//取key值
function getValue(object,key){
	return object == null ? undefined : object[key]
}



//检测覆盖的core.js 垫片？？？？？？？？？？？？
var coreJsData = context['__core-js_shared__'];

/**
 *
 */
var maskSrcKey = (function(){
	var uid = /[^.]+$/.exec(coreJsData && coreJsDate.keys && coreJsData.keys.IE_PROTO || '');
	return uid ? ('Symbol(src)_1.'+uid) : '';
}())

/**
 *
 * @param func
 * @returns {boolean}
 */
function isMasked(func){
	return !!maskSrcKey && (maskSrcKey in func)
}

/**
 *
 * @param value
 * @returns {boolean}
 */
function baseIsNative(value){
	if(!isObject(value) || isMasked(value)){
		return false
	}
	var pattern = isFunction(value)? reIsNative : reIsHostCtor;
	return pattern.test(toSource(value))
}
function getNative(object,key){
	var value = getValue(object,key);
	return baseIsNative(value)?value:undefined;
}
var defineProperty = (function(){
	try{
		var func = getNative(object,'defineProperty');
		func({},'',{});
		return func;
	}catch(e){}
}())

/**
 * 如果存在defineProperty，给func定义string属性。
 * 如果不存在就直接执行identity
 */
var baseSetToString= !defineProperty ? identity : function(func,string){
	return defineProperty(func,'toString',{
		'configurable' : true,
		'enumerable' : false,
		'value' : constant(string),
		'writable' : true
	})
}

var HOT_SPAN = 16,
	HOT_COUNT = 800;
/**
 * 触发事件相隔事件大于16ms 直接执行函数。如果小于16ms,如果次数大于800次就返回参数对象。这是高频率触发。
 * @param func
 * @returns {Function} func的执行。
 */
function shortOut(func){
	var count = 0,
		lastCalled = 0;
	return function(){
		var stamp = nativeNow(),
			remaining = HOT_SPAN - (stamp - lastCalled);
		lastCalled = stamp;
		if(remaining > 0){
			if(++count >= HOT_COUNT){
				return arguments[0]
			}
		}else{
			count = 0;
		}
		//全局函数上执行。
		return func.apply(undefined,arguments);
	}
}
/**
 * start作为分水岭，对之后的参数进行变化后作为第start想，最后作为参数传给func开始执行。
 * @param func
 * @param start
 * @param transform
 * @returns {Function}
 */
function overRest(func,start,transform){
	start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
	return function(){
		//args数组start后的项
		var args = arguments,
			index = -1,
			length = nativeMax(args.length-start,0),
			array = Array(length);
		while(++index < length){
			array[index] = args[start+index]
		}
		index = -1;
		//args数组start前的项
		var otherArgs = Array(start+1);
		while(++index < start){
			otherArgs[index] = args[index];
		}
		//otherArgs的最后一项是变化后的数组。
		otherArgs[start] = transform(array);
		//otherArgs后面的项作为参数执行。
		return apply(func,this,otherArgs);
	}
}
var setToString = shortOut(baseSetToString)

function baseRest(func,start){
	return setToString(overRest(func,start,identity))
}