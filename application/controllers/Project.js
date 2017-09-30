// var Tools = global.load_library('Tools')
// var project_model = global.load_model('project_model')
// require(__dirname+'/Client')

// fs.readFileSync( __dirname+'/Client.js', 'utf8');
module.exports = class Project
{
    test(event, req, res, params)
    {
        res.sendFile(global.APPPATH+'views/client/index.html');
        // res.sendFile(global.APPPATH+'views/client/navbar.html');
    }


}


