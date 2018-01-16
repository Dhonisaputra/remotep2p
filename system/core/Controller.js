const Loader = require('./Loader');

module.exports = class AI_Controller
{
	constructor()
	{
		this.load = new Loader();
		this.load.onLoad((data)=>{
			this[data.alias] = data.class_content;
		});
	}


}