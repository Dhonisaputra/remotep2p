var fs = require("fs");
var Helper = require("./Helper");

var Tools = (function() {
    
    var o = function() {}
    o.prototype = {
        write_file: function(folder, title, content)
	  	{
			fs.writeFile(folder+'/'+title, content, function (err) {
			  if (err) return console.log(err);
			  console.log('file successfully created!');
			});
	  	},
	  	create_folder: function (params) {

	  		params = Helper.extend({path: __dirname+'/../locker/'}, params);

	  		params.folder = Array.isArray(params.folder)? params.folder : [params.folder];
	  		params.folder.forEach(function(element, index, array){

				fs.mkdir(params.path+element,function(err){
			   		if (err) {
			       		return console.error(err);
			   		}
			   		console.log("Directory "+element+" successfully created!");
				});
	  		})
	  	},
	  	check_file: function(path){
	  		return fs.existsSync(path)
	  	}
    };
    var nO = new o();
    return nO;
})()

module.exports = Tools;

