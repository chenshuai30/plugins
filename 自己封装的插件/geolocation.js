function getgeolocation (fn, fn1, option){
	navigator.geolocation.getCurrentPosition(function(e){
		fn.call(e.coords);
	}, function(e){
		fn1.call(e);
	}, option);
}