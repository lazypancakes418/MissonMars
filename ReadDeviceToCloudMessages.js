'use strict';

var EventHubClient = require('azure-event-hubs').Client;

var connectionString = 'HostName=marsiotnyc.azure-devices.net;SharedAccessKeyName=coffeeclient;SharedAccessKey=SRFKGwGTdEJ8cm55akdz/QPqZH2b874zhOrMSNDY7js=';

var printError = (err) => {
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
      return client.createReceiver('team08', partitionId, { 'startAfterTime': Date.now() }).then(function (receiver) {
        console.log('Created partition receiver: ' + partitionId)
        receiver.on('errorReceived', printError);
        receiver.on('message', printMessage);
      });
    });
  })
  .catch(printError);
