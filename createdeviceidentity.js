'use strict';

var iothub = require('azure-iothub');

var connectioString ='HostName=coffeepot-mars.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=tWEcUQ5OgYTCwIw09YrlTu9IXPY3l76BlthLkEGrL8U=';
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

printDeviceInfo = (err, deviceInfo, res) =>{
   if (deviceInfo) {
     console.log('Device ID: ' + deviceInfo.deviceId);
     console.log('Device key: ' + deviceInfo.authentication.symmetricKey.primaryKey);
   }
 }

/*
Device ID: myFirstNodeDevice
Device key: OAQ/5SRv5KFBLmSNAylq8vDhOsrjbw8t6zECngyqcmM=
*/