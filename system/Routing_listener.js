// EXPERIMENTAL
tools = global.load_library('Tools')
var Route = function(event)
{
	this.event = event;
	this.controller_file = null;
	this.controller_name = null;
	return this.routing();
}
Route.prototype = 
{
	prepare: function()
	{
		var lib = ''
		var file = null
		this.path().forEach(function(item, index){
			if(file == null)
			{

				lib = item;
				var filepath = global.APPLICATION_PATH('controllers/'+lib+'.js');
				var isFile = tools.check_file(filepath)
				if(!isFile || !file)
				{
					lib +='/'
				}else
				{
					file = global.APPLICATION_PATH('controllers/'+lib+'.js');
				}
			console.log(lib)
			}
		})

	},
	routing: function()
	{
		var path = this.path();
		var data = {}
		data.file = path.shift();
		data.function = path.shift();
		return data;
	},
	path: function()
	{
		var ev = this.event.split('/')
		return ev

	}
}

module.exports = Route