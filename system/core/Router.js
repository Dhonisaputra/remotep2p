var RTRm = global.load_class('Router', global.BASEPATH+'libraries', 'Co');
var Routes = require(global.APPPATH+'config/Routes');


module.exports = class Router
{
	construction()
	{
		this._classname = 'default_controller';
		this._functionname = 'index';
	}
	set_routing(event)
	{
		var RTR_data = RTRm.routing(event)
		
		var fnname = (RTR_data.function && RTR_data.function != '')? RTR_data.function : 'index';
		
		var classname 	= (!RTR_data.file || RTR_data.file == '')? 'default_controller' : RTR_data.file;
		classname 		= (Routes[classname])? Routes[classname] : classname;

		this.class 		= classname;
		this.function 	= fnname;
		this._routing_params = (RTR_data.params)? RTR_data.params : {};
	}
	parse_routing(event)
	{
		var RTR_data = RTRm.routing(event)
		
		var fnname = (RTR_data.function && RTR_data.function != '')? RTR_data.function : 'index';
		
		var classname 	= (!RTR_data.file || RTR_data.file == '')? 'default_controller' : RTR_data.file;
		classname 		= (Routes[classname])? Routes[classname] : classname;
		return {class: classname, function: fnname}
	}

	class_name()
	{
		return this._classname;
	}
	function_name()
	{
		return this._functionname;
	}
}
