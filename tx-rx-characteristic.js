var util = require('util');
var os = require('os');
var exec = require('child_process').exec;
var bleno = require('bleno');
var Descriptor = bleno.Descriptor;
var Characteristic = bleno.Characteristic;
var definition = require('./definition');


var TxRxCharacteristic = function() {
	TxRxCharacteristic.super_.call(this, {
		uuid : definition.CHAR_TX_UUID,
		properties : [ 'read', 'write', 'notify' ],
		descriptors : [ new Descriptor({
			uuid : '2901',
			value : 'read means from Tx, write means to Rx'
		}), new Descriptor({
			uuid : '2904',
			value : new Buffer([ 0x04, 0x01, 0x27, 0xAD, 0x01, 0x00, 0x00 ])
		// maybe 12 0xC unsigned 8 bit
		}) ]
	});
};

util.inherits(TxRxCharacteristic, Characteristic);

TxRxCharacteristic.prototype.onReadRequest = function(offset, callback) {

	callback(this.RESULT_SUCCESS, new Buffer([ 0 ]));// TODO

};

TxRxCharacteristic.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) {

	callback(this.RESULT_SUCCESS);// TODO

};

TxRxCharacteristic.prototype.singleton = new TxRxCharacteristic();

var reader = require('readline').createInterface({
	input : process.stdin,
	output : process.stdout
});

reader.on('line', function(line) {
	// console.log('stdin: ' + line);
	if (TxRxCharacteristic.prototype.singleton.updateValueCallback) {
		TxRxCharacteristic.prototype.singleton.updateValueCallback(new Buffer(line + '\n', 'ascii'));
	}
	process.stdout.write('input>');
});

module.exports = TxRxCharacteristic;
