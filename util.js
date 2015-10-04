var sensorLib = require('node-dht-sensor');

var internal={
	initialize: function (cb) {
		return sensorLib.initialize(22, 4);
	},
	read: function (cb) {
		var readout = sensorLib.read();
		if(typeof(cb)=='function') {
			cb(readout);
		}
	},
	c2f: function(c) {
		return 32+9*c/5;
	}
};

module.exports=internal;
