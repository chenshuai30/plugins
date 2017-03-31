function setcookie (name, value, day){
	var time = new Date();
	time.setTime(time.getTime() + day * 24 * 60 * 60 * 1000);
	document.cookie = name + "=" + value + ';expires=' + time.toGMTString();
}
function getcookie (name){
	var exe = new RegExp('(^|\\s)'+name+"="+'[^;]+');
	var arr = document.cookie.match(exe);
	if(!arr){return false}
	return arr[0].split('=')[1];
}