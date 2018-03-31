module.exports = class Remote
{
	index(event, req, res)
	{
		let response = {code:500}

		let post = $_REQUEST.POST;
		if(post.apiKey && post.event)
		{
			post.data = post.data||{}
			var room = post.apiKey;
	        var event = room+'_'+post.event
	        io.to(room).emit(event, post.data);
	        response.code = 200;
	        response.body = post;
		}

        res.setHeader('Content-Type', 'application/json');
	    res.send(JSON.stringify(response));

	}
}