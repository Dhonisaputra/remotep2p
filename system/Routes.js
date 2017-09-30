var Routes = require(global.SYSTEM_PATH('Routing_listener'))
module.exports = function(requirement){
	var app = requirement.app;
	
	app.get('*', function(req, res){
		var event = req.originalUrl;
		event = event.split('/');
		event = event.filter(function(res){return res != ''})
		event = event.join('/');

		var RTS = new Routes(event)
        var CTR = global.load_controller(RTS.file)
        if(typeof CTR[RTS.function] == 'function')
        {
        	
            var data = CTR[RTS.function](event)
        }
	})
}
