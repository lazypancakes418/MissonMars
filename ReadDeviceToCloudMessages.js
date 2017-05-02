'use strict';

var EventHubClient = require('azure-event-hubs').Client;

var connectioString = 'HostName=coffeepot-mars.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=tWEcUQ5OgYTCwIw09YrlTu9IXPY3l76BlthLkEGrL8U=';

var printerror = (err) => {
  consle.log(err.message)
};

var printMessage = (message) => {
  console.log('Message Received: ');
  console.log(JSON.stringify(message.body));
  console.log('');
};

var client = EventHubClient.fromConnectionString(connectionString);
client.open()
  .then(client.getPartitionIds.bind(client))
  .then(function (partitionIds) {
    return partitionIds.map(function (partitionId) {
      return client.createReceiver('$Default', partitionId, { 'startAfterTime': Date.now() }).then(function (receiver) {
        console.log('Created partition receiver: ' + partitionId)
        receiver.on('errorReceived', printError);
        receiver.on('message', printMessage);
      });
    });
  })
  .catch(printError);
  