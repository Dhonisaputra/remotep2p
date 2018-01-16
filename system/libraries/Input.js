module.exports = class AI_Input
{
	constructor()
	{
		this.data = {}
	}
	set_get_query(data)
	{
		this.data.get = data;
	}

	get()
	{
		return this.data.get;
	}
}