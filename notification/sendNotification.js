
var fs = require("fs");
FCM = require('fcm-node');

var SERVER_API_KEY='AAAADW73uaI:APA91bE6b7oJhkfTemiu-hr8MzJ5uu-MWtQbdEOHjpJjbHl_AUbgxKtDu4SSKMz--XJU-sxAKlg50LHGAjD-IKJwNy_2FwEf-rIEumMENn9pk5aaV56i8gN_IVUZJRjsHq3sp99-8CCu';//put your api key here

var fcmClient= new FCM(SERVER_API_KEY);


exports.sendNotify = function(title, message){

    try {
        var token = fs.readFileSync('token.txt', 'utf-8');
    
        var notifyJson = {
            to: token,
            priority: 'high',
            content_available: true,
            notification: { //notification object
                title: title, body: message, sound : "default", badge: "1"
            }
        };
        
        fcmClient.send(notifyJson,function(err,res){

            if(err)
            console.log("fcm.send err: " + err);
            else
            console.log("fcm.send resp: "+ res)
        });

      } catch(err){
        console.log("token bulunamadı: err: "+ err)
      }

}
