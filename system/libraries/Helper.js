
var fs = require("fs");
var Helper = (function() {
    
    var o = function() {}
    o.prototype = {
       
		extend : function(target) {
		    var sources = [].slice.call(arguments, 1);
		    sources.forEach(function (source) {
		        for (var prop in source) {
		            target[prop] = source[prop];
		        }
		    });
		    return target;
		},

		unique_id: function(){
    		var crypto = require('crypto');
    		var rand = crypto.randomBytes(32).toString("hex")
    		crypto.createHmac('sha256', rand)
                   .update(new Date().getTime())
                   .digest('hex');
		},

    };
    var nO = new o();
    return nO;
})()

module.exports = Helper;

