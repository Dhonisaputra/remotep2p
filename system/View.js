
global.load_view = function(name, return_content)
{
	var fs = require('fs');

	if(typeof name == 'string')
	{
		var path = global.APPLICATION_PATH('views/'+name);
		
		var isExist = fs.existsSync(path)
		if(isExist)
		{
			if(typeof return_content == 'boolean')
			{
				return fs.readFileSync( path, 'utf8');
			}else
			{
				// global._res_routing(path)
			}
		}else
		{
			console.error('model '+name+' not found!')
		}
		
	}
	else
	{
		console.error('Name should be string')
	}
}
