var fs = require('fs');

global.load_class = function($class, directory = 'library', prefix = '')
{
	global._classess = {};


	var $class = prefix?prefix+'_'+$class+global.EXT : $class+global.EXT;

	var path = directory+'/'+$class;
	var isExist = fs.existsSync(path)
	if(isExist)
	{
		var class_load = require(path)
		global._classess[$class] = new class_load;
		return global._classess[$class];	
	}else
	{
		console.error('class '+$class+' not found!')
		return;
	}

	
}



global.APPLICATION_PATH = function(url)
{
	url = !url?'':url;
	return global.APPPATH+url
}

/*global.BASEPATH = function(url)
{
	url = !url?'':url;
	return global.BASEPATH+url
}*/

global.SYSTEM_PATH = function(url)
{
	url = !url?'':url;
	return global.SYSDIR+url;
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

global.load_view = function(name)
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


