
class Controller()
{
	
}

global.load_controller = function(name)
{
	var fs = require('fs');

	if(typeof name == 'string')
	{
		var path = global.APPLICATION_PATH('controllers/'+name+'.js');
		
		var isExist = fs.existsSync(path)
		if(isExist)
		{
			return require(path)
		}else
		{
			console.error('controller '+name+' not found!')
			return false;
		}
		
	}
	else
	{
		console.error('Name should be string')
		return false;
	}
}