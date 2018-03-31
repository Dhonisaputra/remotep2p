global.AKAR_VERSION = '1.0.0';

// Load Server
require('./Server.js');

// load Common
require('./Common.js')
require(global.APPLICATION_PATH('listeners/default.js'))
require(global.SYSTEM_PATH('libraries/Database.js'))
// require('./static_routes.js')

global.app.use("/modules",global.express.static('node_modules'));
global.app.use("/assets",global.express.static('assets'));

global.RTR = global.load_class('Router', global.BASEPATH+'core');
var RTR = global.RTR;

function routing(req, res)
{

    var event = req.params[0];
    event = event.split('/');
    event = event.filter(function(res){return res != ''})
    event = event.join('/');
    RTR.set_routing(event)
    
    let classname = RTR.class.charAt(0).toUpperCase() + RTR.class.slice(1);
    var CTR = global.load_class(classname, global.APPLICATION_PATH('controllers'));
    if(CTR)
    {
        // console.log(RTR._functionname, RTR._classname)

        // var CTR = global.load_controller(RTR.class)
        if(typeof CTR[RTR.function] == 'function')
        {
            // console.log(RTR.function)
            CTR[RTR.function](event, req, res, RTR._routing_params)
        }
    }
}
app.post('*', function(req, res) {
    $_REQUEST['GET'] = req.query;
    $_REQUEST['POST'] = req.body;
    console.log(req.body)
    routing(req,res)
});

global.app.get('*', function(req, res){
    $_REQUEST['GET'] = req.query;
    $_REQUEST['POST'] = req.body;
    routing(req,res)
    
})

