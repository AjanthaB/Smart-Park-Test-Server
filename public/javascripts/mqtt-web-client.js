/**
 * Created by ajantha on 7/26/16.
 */

var options = {
    host:"52.24.61.14",
    port:1884
};

client = new Paho.MQTT.Client(options.host, Number(options.port), "smartParkServer");

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

client.connect({onSuccess:onConnect});

var chart;

function onConnect() {
    console.log("Connected to the Server");
    chart = new DrawChart();
    client.subscribe("toMobile");
    client.subscribe("newClient");
    sendMessage("newClient","newClient");
}

function sendMessage(msg,destination) {
    var message =  new Paho.MQTT.Message(jsonToString(msg));
    message.destinationName = destination;
    client.send(message);
}

function jsonToString(jsonObj) {
    return jsonObj.toString();
}

function stringToJSON(str) {
    return JSON.parse(str);
}

function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:"+responseObject.errorMessage);
    }
}

function onMessageArrived(message) {
    console.log(message.payloadString);
    // console.log(message._getDestinationName());
    checkTopic(message);
    $('#messages').append(message.payloadString);
}

function checkTopic(message) {
    if( "toMobile"== message.destinationName){
        chart.clearChart();
        chart.initialize(stringToJSON(message.payloadString), function (owners, slots, availableSlots) {
            chart.draw(owners, slots, availableSlots);
        });

    }
}

