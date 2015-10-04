//var socket = io('http://10.1.60.60:4000');
var socket = io();
var last_ht={
	h: { val: '', ts: null },
	t: { val: '', ts: null }
};
function prev_h() {
	var p= !last_ht.h.ts ? '&nbsp;': 'was '+ last_ht.h.val + '% '+ moment(last_ht.h.ts).calendar();
	document.getElementById('js-humidity-previous').innerHTML=p;
}
function prev_t() {
	var p= !last_ht.t.ts ? '&nbsp;': 'was '+ last_ht.t.val + 'F '+ moment(last_ht.t.ts).calendar();
	document.getElementById('js-temperature-previous').innerHTML=p;
}
socket.on('connect', function(){
	console.log('connected');
});
socket.on('ht', function(data){
	if('h' in data) {
		prev_h();
		document.getElementById('js-humidity').innerHTML=data.h.val+'%';
		last_ht.h=data.h;
	}
	if('t' in data) {
		prev_t();
		document.getElementById('js-temperature').innerHTML=data.t.val+'F';
		last_ht.t=data.t;
	}
});
socket.on('disconnect', function(){
	console.log('disconnected');
});
socket.on('message', function(m) {
	console.log('received message: '+m);
});
