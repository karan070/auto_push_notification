const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

var msgData;
var msgData2;

exports.offerTrigger = functions.firestore.document(
    'Tests/{TestId}'
).onCreate((snapshot, context) => {
    msgData = snapshot.data();

    admin.firestore().collection('pushtokens').get().then((snapshots)=> {
        var tokens = [];
        if(snapshots.empty){
            console.log('No Devices');
        }
        else{
            for (var token of snapshots.docs){
                tokens.push(token.data().devtoken);
            }

            var payload = {
                "notification" : {
                    "title" : "From Abhiyantriki shiksha",
                    "body" : "Test :" + msgData.Subject,
                    "sound" : "default"
                },
                "data" : {
                    "sendername" : "Abhiyantriki shiksha",
                    "message" : "Test of" + msgData.Subject
                }

            }
            return admin.messaging().sendToDevice(tokens,payload).then((response)=>{
                console.log("Pushed them all");
            }).catch((e)=>{
                console.log(e);
            })
        }
    })
})

exports.ResultTrigger = functions.firestore.document(
    'Result/{ResultId}'
).onCreate((snapshot, context) => {
    msgData = snapshot.data();

    admin.firestore().collection('pushtokens2').get().then((snapshots)=> {
        var tokens = [];
        if(snapshots.empty){
            console.log('No Devices');
        }
        else{
            for (var token of snapshots.docs){
                tokens.push(token.data().devtoken);
            }

            var payload = {
                "notification" : {
                    "title" : "From Abhiyantriki shiksha",
                    "body" : "Test Result Uploaded",
                    "sound" : "default"
                },
                "data" : {
                    "sendername" : "Abhiyantriki shiksha",
                    "message" : "Test Result"
                }

            }
            return admin.messaging().sendToDevice(tokens,payload).then((response)=>{
                console.log("Pushed them all");
            }).catch((e)=>{
                console.log(e);
            })
        }
    })
})

exports.AttTrigger = functions.firestore.document(
    'Attendance/{AttendanceId}'
).onUpdate((snapshot, context) => {
    msgData = snapshot.data();

    admin.firestore().collection('pushtokens').get().then((snapshots)=> {
        var tokens = [];
        if(snapshots.empty){
            console.log('No Devices');
        }
        else{
            for (var token of snapshots.docs){
                tokens.push(token.data().devtoken);
            }

            var payload = {
                "notification" : {
                    "title" : "From Abhiyantriki shiksha",
                    "body" : "Attendance Uploaded",
                    "sound" : "default"
                },
                "data" : {
                    "sendername" : "Abhiyantriki shiksha",
                    "message" : "Check your Attendance"
                }

            }
            return admin.messaging().sendToDevice(tokens,payload).then((response)=>{
                console.log("Pushed them all");
            }).catch((e)=>{
                console.log(e);
            })
        }
    })
})