let admin = require("firebase-admin");
let Queue = require('firebase-queue');
var serviceAccount = require("../../system/storages/service_account/sa.json");
var Cron = require('firebase-cron');
let configFirebase = {
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://scheduler-dd497.firebaseio.com",
};

admin.initializeApp(configFirebase);
let ref = admin.database();
let queueOpt = {
  'specId': 'spec_1',
  'numWorkers': 5,
  'sanitize': false,
  'suppressStack': true
};
let queueRef = new Queue(ref.ref('queue'), queueOpt, function(data, progress, resolve, reject){
	
});

module.exports = class Schedules
{
	constructor()
	{
		this.options = {endpoint: 'cronjobs'};
		this.cron = new Cron(ref, queueRef, this.options);
	}
	set(event, req, res)
	{
		// this.cron.addJob('cron-tests', '* * * * *', {test:true, url: 'http://www.google.com'})
		var cron = require('node-cron');
 
		cron.schedule('* * * * *', function(){
		  console.log('running every minute to 1 from 5');
		});
		res.json({data:true})
		// return 'rough';
	}
	run(event, req,res)
	{
		ref.ref("cronjobs")
		.on("value", function(snapshot) {
		  console.log(snapshot.val());
		}, function (errorObject) {
		  console.log("The read failed: " + errorObject.code);
		});

	}
}