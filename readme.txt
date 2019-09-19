The solution contains 3 parts:
1. BotBackend - It's the web hook for Telegram 3 bots
2. BotStatusFrontend - It's the client side for website that displays status monitor on the 3 bots
3. BotStatusBackend - It's the server side for BotStatusFrontend 

General Information:
* Instaed of using the 3 customersupport existing bot , I created 3 new bots named: Ayala1Bot,Ayala2Bot and Ayala3Bot (I see that they already work- it seams that another person already implemented them)
* I added in DB in Bots collection 3 new records for my bots 
* The available topic (for test it against the BotFather):
	*Ayala1Bot: products, telephons.
	*Ayala2Bot: English, Hebrew.
	*Ayala3Bot: ECG, Cardiology.
* I didn't treat the case that user enter '/askforhelp' before he engaged the bot even though it is required in real worl -  because it requires treat the whole subject of 'users' who engaged the bot and who disengage and I understand from Dev Task document that it is not neccessary for the exam.


Run and Test Instructions
1. BotBackend
	* It's implemented as a nodejs server, execute the following command to run the server: 
		'node index.js'
	* After the server is running, we should update the webhook address of the three bots with this server address, 
	 you can do it from botstatus website (see details in BotStatusFrontend section).
	* I didn't have public domain to put there the server, so I used ngrok tool to generate for me a temporary public address,
	 to do it, you should download the ngrok tool and run the command: 'ngrok http 80', then take the https generated address
	 and send it as the webhook address for the 3 bots
	* I created 3 seperated endpoints for the 3 bots: '/bot1','/bot2','/bot3'
2. BotStatusBackend
	* It's implemented as a nodejs server, execute the following command to run the server: 
		'node www'
3. BotStatusFrontend 
	* It's implemented as an Angular 8 project, to run it in development environment execute the following command:
		'ng serve'
	* Open Chrome browser and navigate to 'localhost:4200', you should see the main page.
	* The main page contains 2 parts:
		1. The status monitor view as is required in Dev Task document
		2. The ability to define the webhook address for the three bots
	* To update the web hook address, insert into the input control the base address of BotBackend server and click on the button.

Summary
1. It was a very interesting and instructive project. thanks!
2. I tested the entire solution in my computer and all was run and work perfectly, so I hope you succeed in running everything in your environment as well. 
	
Ayala.