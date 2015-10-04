var Hapi = require('hapi');
var Path=require('path');
var Inert=require('inert');
var Util=require('./util');
var last_ht={t: {val: '', ts: null}, h: {val: '', ts: null}};

var server = new Hapi.Server({
	connections: {
		routes: {
			files: {
				relativeTo: Path.join(__dirname, 'public')
			}
		}
	}
});
server.connection({ port: 4000 });
server.register(Inert, function() {});

var io = require('socket.io')(server.listener);

function get_ht() {
	Util.read( function(res) {
		var now=(new Date()).getTime();
		var tosend={};
		var hval=res.humidity.toFixed(2);
		if(hval!==last_ht.h.val) {
			console.log('sending hum, ', hval, 'last_h', last_ht.h.val);
			tosend.h={ val: hval, ts: now};
			last_ht.h=tosend.h;
		}
		var tval=Util.c2f(res.temperature).toFixed(2);
		if(tval!==last_ht.t.val) {
			console.log('sending temp, ', tval, 'last_t', last_ht.t.val);
			tosend.t={ val: tval, ts: now };
			last_ht.t=tosend.t;
		}
		if(Object.keys(tosend).length>0) {
			io.emit('ht', tosend);
		}
		setTimeout(get_ht, 2000)
	});
}

io.on('connection', function (socket) {
	socket.emit('ht', last_ht);
});


server.route({
	method: 'GET',
	path: '/{param*}',
	handler: {
		directory: {
			path: '.',
			redirectToSlash: true,
			listing: false
		}
	}
});

server.start(function(err) {
	if(err) {
		throw err;
	}
	Util.initialize();
	setTimeout( get_ht, 90 );
	console.log('Started at '+server.info.uri);
});
