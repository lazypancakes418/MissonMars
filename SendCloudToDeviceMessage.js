 'use strict';

 var Client = require('azure-iothub').Client;
 var Message = require('azure-iot-common').Message;

var connectionString = 'HostName=marsiotnyc.azure-devices.net;SharedAccessKeyName=coffeeclient;SharedAccessKey=SRFKGwGTdEJ8cm55akdz/QPqZH2b874zhOrMSNDY7js=';
var targetDevice = 'coffeepot';

 var serviceClient = Client.fromConnectionString(connectionString);

 function printResultFor(op) {
   return function printResult(err, res) {
     if (err) console.log(op + ' error: ' + err.toString());
     if (res) console.log(op + ' status: ' + res.constructor.name);
   };
 }

 function receiveFeedback(err, receiver){
   receiver.on('message', function (msg) {
     console.log('Feedback message:')
     console.log(msg.getData().toString('utf-8'));
   });
 }


serviceClient.open(function (err) {
   if (err) {
     console.error('Could not connect: ' + err.message);
   } else {
     console.log('Service client connected');
     serviceClient.getFeedbackReceiver(receiveFeedback);
     var mess = JSON.stringify({
     Command: "Brew",
     Team: "team08",
     Parameters: "English Breakfeast"
   })
     var message = new Message(mess);
     message.ack = 'full';
     message.messageId = "My Message ID";
     console.log('Sending message: ' + message.getData());
     serviceClient.send(targetDevice, message, printResultFor('send'));
   }
 });