var TelegramBot = require('node-telegram-bot-api');
var token = '531797221:AAE17g88oMGzWCxUIkUwRNTkH2KWwOamTk4';
var bot = new TelegramBot(token, {
	pollin: true,

});
bot.on('message', function(msg){
	//var id = msg.chat.id;
	console.log(msg);
})