var fs = require("fs");
class Tools
{
	constructor(){

	}

	write_file()
	{
		fs.writeFile(folder+'/'+title, content, function (err) {
		  if (err) return console.log(err);
		  console.log('file successfully created!');
		});
	}
}