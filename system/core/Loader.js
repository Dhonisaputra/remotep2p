module.exports = class Loader
{
	constructor()
	{
		this._rec_model = {}
	}
	load_class(name, params, prefix, path)
	{
		path 			= !path ? global.APPPATH+'models/' : path;
		let prefix_name = this._prefix(name, prefix)
		let filepath 	= path+prefix_name;
		let classname 	= name.toLowerCase();

		this._rec_model[classname] = require(filepath);
		let dataReturn = {
			name: name,
			prefix_name: prefix_name,
			classname: classname,
			alias: name.toLowerCase(),
			prefix: prefix,
			params: params,
			class_object: this._rec_model[classname],
			class_content: new this._rec_model[classname],
			path: path,
			filepath: filepath
		};
		
		if(typeof this.onLoadSomething == 'function')
		{
			 
			this.onLoadSomething(dataReturn);
		}
	}
	// load model
	model(name, params, prefix)
	{
		let isMultiple = name.indexOf(',') > -1 ? true : false;
		if(isMultiple == true)
		{
			name = name.split(',');
			name.forEach((name, index)=>{
				name = name.replace(/ /g, "");
				name = this._classname(name)
				this.load_class(name, params, prefix)
			})
		}else {
			name = this._classname(name)
			this.load_class(name, params, prefix)
		}
		
	}

	library(name, params, prefix, path)
	{
		prefix = prefix? prefix : 'Ai';
		path = path? path : global.BASEPATH+'libraries/'

		let isMultiple = name.indexOf(',') > -1 ? true : false;
		if(isMultiple == true)
		{
			name = name.split(',');
			name.forEach((value, index)=>{
				let isObj = typeof value == 'Object';
				if(isObj)
				{
					name = value.name;
					params = value.params;
					prefix = value.prefix;
					path = value.path;	
				}
				name = this._prefix(name, prefix)
				name = name.replace(/ /g, "");
				this.load_class(name, params, prefix, path)
			})
		}else {
			name = name.charAt(0).toUpperCase()+name.slice(1);
			this.load_class(name, params, prefix, path)
		}
		
	}

	_prefix(name, prefix)
	{
		if(prefix && prefix != '')
		{
			name = prefix+'_'+name;
		}
		return name
	}

	_classname(name)
	{
		return name.charAt(0).toUpperCase()+name.slice(1);
	}

	onLoad(fn)
	{
		this.onLoadSomething = fn;

	}
}