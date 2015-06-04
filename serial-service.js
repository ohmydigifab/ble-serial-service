var util = require('util');
var bleno = require('bleno');
var BlenoPrimaryService = bleno.PrimaryService;
var TxRxCharacteristic = require('./tx-rx-characteristic');
var definition = require('./definition');

function SerialService() {
	SerialService.super_.call(this, {
		uuid : definition.SERVICE_UUID,
		characteristics : [ TxRxCharacteristic.prototype.singleton ]
	});
}

util.inherits(SerialService, BlenoPrimaryService);

module.exports = SerialService;
