module.exports = class Co_Router
	{
		constructor()
		{
			this.controller_file = '';
			this.controller_name = null;			
		}
		prepare()
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

			console.log(this.controller_file)
		}
		routing(event)
		{
			this.event = event;
			var path = this.path();
			var data = {}
			var file = path.shift();
			var func = path.shift();
			data.file = file
			data.function = func
			data.params = path;
			return data;
		}
		path()
		{
			var ev = this.event.split('/')
			return ev

		}
	}

/*// EXPERIMENTAL
tools = global.load_library('Tools')

Co_Router = function(event)
{
	this.event = event;
	this.controller_file = null;
	this.controller_name = null;
	return this.routing();
}
Co_Router.prototype = 
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

		console.log(this.controller_file)
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

module.exports = Co_Router*/