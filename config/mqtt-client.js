'user strict'

var mqtt = require('mqtt');
// const client = mqtt.connect('tcp://52.24.61.14:1883');
var client = mqtt.connect('tcp://192.168.8.100:1883');
var Service = require('../services/nodeService');
var nodeService = new Service();

// console.log(nodeService);

var messages = [];
var message = {
    nodeId:0,
    owner:"",
    isAvailable:false
};

var contained = false;

client.on('connect', function() {
    console.log("connection on");
    subscribe('toServer-new');
    subscribe('toServer');
    subscribe('newClient');
    publish('toMobile',jsonToString([{nodeId:100, isAvailable:false,owner:"e-fac"}]));
});

function subscribe(topic){
    client.subscribe(topic, function (err, granted) {
        if(err){
            console.log("can't subscribe to ", topic[0].topic);
        }
        if(granted){
            console.log("subscribed to ", granted[0].topic);
        }
    });
}

function publish(topic, msg){
    client.publish(topic, msg, function () {
        console.log("data is been published to ",topic);
    });
}

function jsonToString(obj) {
    return JSON.stringify(obj);
}

function toJSON(str) {
    return JSON.parse(str);
}

client.on('message', function (topic, message) {
    // message is a Buffer
    var msg = message.toString();
    if ("toServer-start"=="topic"){
        publish('toMobile',message.toString());
    }else if("toServer"==topic){
        nodeService.findOneAndUpdate(toJSON(message), function (err,updatedNode) {
           if(!err){
               console.log("node have been saved");
               console.log(updatedNode);
               nodeService.getAll(function (err,nodes) {
                   if(!err){
                       publish('toMobile',jsonToString(nodes));
                   }
               });
           } else{
               console.log(err);
           }
        });

    }else if("newClient" == topic){
        nodeService.getAll(function (err,nodes) {
            if(!err){
                publish('toMobile', jsonToString(nodes));
            }
        })
    }else {
        console.log("Wrong Topic");
    }
});

client.on('reconnect', function () {
    console.log("client is reconnecting");
});

client.on('offline', function () {
    console.log("client is offline");
});

client.on('close', function () {
    console.log("client closed");
});

client.on('error', function (error) {
    console.log("error occurred");
    console.log(error);
    client.end();
});

module.exports = client;




