

global.APPLICATION_PATH = function(url)
{
	url = !url?'':url;
	return global.APPPATH+url
}

global.BASEPATH = function(url)
{
	url = !url?'':url;
	return global.BASEPATH+url
}

global.SYSTEM_PATH = function(url)
{
	url = !url?'':url;
	return global.SYSPATH+url;
}

global.load_library = function(name)
{
	var fs = require('fs');

	if(typeof name == 'string')
	{
		var path = [global.SYSTEM_PATH('libraries/'+name+'.js'), global.APPLICATION_PATH('libraries/'+name+'.js')]
		
		var isExist = fs.existsSync(path[1])
		if(isExist)
		{
			return require(path[1])
		}else
		{
			return require(path[0])
		}
		
	}
	else
	{
		console.error('Name should be string')
	}
}
