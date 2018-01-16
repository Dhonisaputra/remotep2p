// var Tools = global.load_library('Tools')
// var project_model = global.load_model('project_model')
// require(__dirname+'/Client')
const AI_Controller = require('../../system/core/Controller');
// fs.readFileSync( __dirname+'/Client.js', 'utf8');
module.exports = class Project extends AI_Controller
{
	constructor()
	{
		super();
	}
    test(event, req, res, params)
    {
    	this.load.model('users_model');
    	this.load.library('input');

    	let get = this.input.get();
    	console.log(get)
        res.sendFile(global.APPPATH+'views/client/index.html');
        // res.sendFile(global.APPPATH+'views/client/navbar.html');
        // console.log(params)
    }




}


