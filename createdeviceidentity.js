'use strict';

var iothub = require('azure-iothub');

var connectioString ='{iothub connection string}';
var registry = iothub.Registry.fromConnectionString(connectioString);

var device = new iothub.Device(null);

device.deviceId='myFirstNodeDevice';
registry.create(device, (err, deviceInfo, res) => {
  if(err) {
    registry.get(device.deviceId, printDeviceInfo);
  }
  if (deviceInfo) {
    printDeviceInfo(err, deviceInfo, res)
  };
});