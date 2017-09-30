/*
var enc = new Encryption();

var key = enc.keys(undefined);
var encrypt = enc.encrypt('saya', key.key_A, key.key_B);
var decrypt = enc.verify('saya', encrypt, key.key_A, key.key_B);

*/
var crypto = require('crypto');
var helper = global.load_library('Helper');

var Encryption = function() {}
Encryption.prototype = {
	HASH_ALGO: 'sha384',
	METHOD : 'AES-256-OFB',
	_cipher: function($key, $text, $output)
	{
   		$output = !$output?'hex':$output;

		var cipher = crypto.createCipher(this.METHOD, $key);
		var encrypted = cipher.update($text, 'utf8', $output);
		encrypted += cipher.final($output);
		return encrypted;
	},
   	keys: function($master, $output)
   	{
   		$output = !$output?'hex':$output;

   		var byteA = crypto.randomBytes(32).toString('hex');
   		var byteB = (!$master)? crypto.randomBytes(64).toString('hex') : $master;

		var key_A 		= this._cipher(byteA, byteB, $output);

		var key_B 		= this._cipher(byteB, byteB, $output);

		return {key_A: key_A, key_B:key_B}
   	},
	encrypt: function($text, $key_A, $key_B, $config)
	{
		$config = helper.extend({output: 'hex'}, $config)

		var cipherKey = this._cipher($key_A, $key_B, $config.output);
		var encrypted = this._cipher(cipherKey, $text, $config.output);
		return encrypted;
	},
	decrypt: function($encrypted, $key_A, $key_B, $config)
	{
		$config = helper.extend({output: 'hex'}, $config)
		var cipherKey = this._cipher($key_A, $key_B, $config.output);

		var decipher = crypto.createDecipher(this.METHOD, cipherKey);
		var decrypted = decipher.update($encrypted, $config.output, 'utf8');
		decrypted += decipher.final('utf8');
		return decrypted;
	},
	verify: function($text_verify, $encrypted,  $key_A, $key_B, $config)
	{
		return this.decrypt($encrypted,  $key_A, $key_B, $config) == $text_verify
	}

};


module.exports = Encryption;

