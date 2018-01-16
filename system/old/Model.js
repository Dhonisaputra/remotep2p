var db = global.load_library('Database');

global.load_model = function(name)
{
	var fs = require('fs');

	if(typeof name == 'string')
	{
		var path = global.APPLICATION_PATH('models/'+name+'.js');
		
		var isExist = fs.existsSync(path)
		if(isExist)
		{
			var model = require(path)
			return new model(db);
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
