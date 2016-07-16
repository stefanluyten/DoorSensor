var express = require('express');
var app = express();

var wasOpen = false;

var pubnub = require("pubnub")({
    ssl           : true,  // <- enable TLS Tunneling over TCP
    publish_key   : "XXX",
    subscribe_key : "sub-c-904b9d38-36a3-11e6-ac64-0619f8945a4f"
});

app.get('/', function (req, res) {
  res.send("You're doing it wrong!");
});

app.get('/open/', function (req, res) {
  res.send("open confirmed");
  console.log("open received");
  var date = new Date().format();
  var message = { "Timestamp" : date, "Status": "Open", "Garage door": 1};
  if(!wasOpen){
  	publish(message);
  }
  wasOpen = true;
});

app.get('/closed/', function (req, res) {
  res.send("closed confirmed");
  console.log("closed received");
  var date = new Date().format();
  var message = { "Timestamp" : date, "Status": "Closed","Garage door": 0};
  if(wasOpen){
  	publish(message);
  }
  wasOpen = false;
});

app.listen(80, function () {
  console.log('Door API up and running');
});



function publish(message)
{
	pubnub.publish({
    	channel   : "Door",
        message   : message,
        callback  : function(e) { 
           console.log("SUCCESS!", e );
        },
        error     : function(e) { 
           console.log("FAILED! RETRY PUBLISH!", e );
        }
    });
}

Date.prototype.format = function() {
   var yyyy = this.getFullYear().toString();
   var mm = (this.getMonth()+1).toString(); 
   var dd  = this.getDate().toString();
   var hrs = this.getHours().toString();
   var mins = this.getMinutes().toString();
   var secs = this.getSeconds().toString();
   var msecs = this.getMilliseconds().toString();

   //return (dd[1]?dd:"0"+dd[0])+"/"+(mm[1]?mm:"0"+mm[0])+"/"+yyyy+" "+(hrs[1]?hrs:"0"+hrs[0])+":"+(mins[1]?mins:"0"+mins[0])+" ("+secs+","+msecs+")";
   return (dd[1]?dd:"0"+dd[0])+"/"+(mm[1]?mm:"0"+mm[0])+"/"+yyyy+" "+(hrs[1]?hrs:"0"+hrs[0])+":"+(mins[1]?mins:"0"+mins[0]);
  };
          