//true document.body.children 'abc'
function isArrayLike(value){
	return value!=null && isLength(value.length) && !isFunction(value)
}

//typeof NaN  === "number"  一个自然数。非NAN
function isLength(value){
	return typeof value === "number" && value > -1 && value <= MAX_SAFE_INTEGER;
}
