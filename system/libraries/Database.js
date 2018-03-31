/*
|----------------
| M A N U A L 
|----------------
*
# UPDATE
-	var.update(:table, :update, :where)

# INSERT
-	var.insert(:table, :data)

#SELECT
- 	var.get(:table)
- 	var.select(:select)
	var.from(:table)
	var.where(:where)
	var.limit(:limit, :limit)
	var.get()
*/

var mysql    	= require('mysql');
var deferred	= require('deferred');
var dbconfig 	= require( global.APPLICATION_PATH('config/database.js') )
var app_config 	= require( global.APPLICATION_PATH('config/config.js') )

var Database = function(config) 
{
	if(!config) return false;
	var checkConfig = Object.keys(config).filter(function(res){
	 	return !config[res]
	})

	if(checkConfig.length > 0)
	{
		return false;
	}

	if(!app_config.using_db)
	{
		return false;
	}
	this.db = mysql.createConnection({
	  	host     : config.HOST,
	  	user     : config.USERNAME,
	  	password : config.PASSWORD,
	  	database : config.DATABASE
	});	
	this.db.connect(function(err) {
		if (err) {
			console.error('error connecting: ' + err.stack);
			return;
		}
		console.log('Connected to '+config.DATABASE)
	})
	this._query_select = '*';
	this._query_from = undefined;
	this._query_where = [];
	this._query_update = [];
	this._query_operator = ['<','>','<=', '>=', '=']
}
Database.prototype = {
	_prepare_where_and: function()
	{
		var where_and 	= []
		var operator= this._query_operator
		this._query_where.forEach(function(item, index){
			for(c in item)
			{
				var op = operator.some(function(res){
					return c.toString().indexOf(res) >= 0;
				})
				op = (!op)? '= ' : '';

				var spacing_after_index = /\s$/.test(c)?'':' ';
				
				var o = c+spacing_after_index+op+item[c];
				where_and.push(o)
				
			}
			/*item.forEach(function(c,d){
			})*/
		})
		
		return where_and.join(' and ')

	},
	
	/*
	|---------------------------
	| Function insert
	|---------------------------
	* @params
	* @params :table 	string
	* @params :data 	object
	*----------------------------
	*/
	insert: function(table, data)
	{

		var query = 'INSERT into ?? set ?';
		return this.query(query, [table, data])

	},
	update: function($table, update, where)
	{

		var SQL = 'UPDATE ?? SET ? where ?';
		var q = this.query(SQL, [$table, update, where])

	},
	delete: function($table, where)
	{

		var SQL = 'DELETE from ?? where ?';
		var q = this.query(SQL, [$table, where])

	},
	query: function($sql, $data)
	{
		var defer = deferred()
		var query = this.db.query($sql, $data, function(err, result, fields){
			this._query_fields = fields;
			if(err)
			{
				defer.reject(err)
			}else
			{
				this._query_result = result;
				defer.resolve(result)
			}
		})
		return defer.promise;
	},
	select: function($select)
	{
		this._query_select = $select
	},
	from: function($table)
	{
		this._query_from = $table
	},
	where: function($where)
	{
		this._query_where.push($where)
	},
	join: function(join, link, join_what)
	{

	},
	get: function(table, get, where)
	{
		if(table)
		{
			this._query_from = table;
			this._query_select = '*';
		}

		var select 	= 'SELECT '+this._query_select+' ';
		var from 	= 'FROM '+this._query_from+' ';
		var where 	= this._prepare_where_and()
		var query 	= select+from
		query 		+= (this._query_where.length < 1)? '' : ' where '+where; 
		return this.query(query);
	}
};

module.exports = new Database(dbconfig[dbconfig.active]);