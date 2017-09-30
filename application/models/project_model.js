
var model = function(db)
{
	this.db = db;
}
model.prototype = 
{
	/*
	|
	| S E L E C T
	|
	*/
	data_project: function()
	{
		return this.db.get
	},

	/*
	|
	| I N S E R T
	|
	*/
	insert_project: function(data)
	{
		return this.db.insert('projects', data)
	},
	insert_project_version: function(data)
	{
		return this.db.insert('project_version', data)
	},
	insert_project_component: function(data)
	{
		return this.db.insert('project_component', data)
	},

	/*
	|---------------
	| U P D A T E
	|---------------
	*/

	update_project: function(update, where)
	{
		return this.db.update('projects', update, where)
	},

	/*
	|
	| D E L E T E
	|
	*/
	delete_project: function(where)
	{
		this.db.delete('projects', where)
	},
}

module.exports = model;