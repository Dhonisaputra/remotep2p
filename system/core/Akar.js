global.AKAR_VERSION = '1.0.0';

// Load Server
require('./Server.js');

// load Common
require('./Common.js')
require(global.APPLICATION_PATH('listeners/default.js'))
// require('./static_routes.js')

global.app.use("/modules",global.express.static('node_modules'));
global.app.use("/assets",global.express.static('assets'));

global.RTR = global.load_class('Router', global.BASEPATH+'core');
var RTR = global.RTR;
global.app.get('*', function(req, res){
	var event = req.originalUrl;
	event = event.split('/');
	event = event.filter(function(res){return res != ''})
	event = event.join('/');
	RTR.set_routing(event)
    
    
    var CTR = global.load_class(RTR.class, global.APPLICATION_PATH('controllers'));
    if(CTR)
    {
        // console.log(RTR._functionname, RTR._classname)

        // var CTR = global.load_controller(RTR.class)
        if(typeof CTR[RTR.function] == 'function')
        {
            CTR[RTR.function](event, req, res, RTR._routing_params)
        }
    }
})

