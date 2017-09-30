module.exports = class Main
{
	index(event, req, res)
	{
        res.sendFile(global.APPPATH+'views/client/main/index.html');
	}

	
}