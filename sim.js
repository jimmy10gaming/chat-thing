// prototypes

// chatter class
var Chatter = function(name, color) {

	// name not given? generate a cool one
	if(name == undefined) {
		this.name = this.generateName();
	} else {
		this.name = name;
	}

	//
	if(color == undefined) {
		this.color = this.generateColor();
	} else {
		this.color = color;
	}

	this.messages = new Array(	"HI WHATS UP!!!",
								"POG",
								"W",
								"L",
								"CINIMA",
								"JIMMY10JAMS",
								"LETS GO!!!",
								"WHAT YOU PLAYING!!",
								"WHAT THE HEEECK",
								"OMG",
								"YO",
								"CHICKEN JOCKEY!!",
								"W JIMMY10JAMS",
								"FINALLY",
								"<a href=\"http://haloruns.com\" target=\"_blank\">haloruns.com</a>"
								);

}

Chatter.prototype.generateName = function() {

	// adjective list
	var adjectives = new Array(	"Cool",
								"Huge",
								"Funny",
								"Cyka",
								"Amazing",
								"Tiny",
								"Stupid",
								"Dank",
								"Wide",
								"Incredible"
								);

	// noun list
	var nouns = new Array(	"Dude",
							"Man",
							"Boy",
							"Barf",
							"Girl",
							"Seeker",
							"Yoshi",
							"Samurai",
							"Beast",
							"Fish",
							"Surfer",
							"Banker",
							"Gamer");

	var adjective = adjectives[Math.floor(Math.random()*adjectives.length)];
	var noun = nouns[Math.floor(Math.random()*nouns.length)];

	var number;

	// force 10% of users to have 69 in their name
	// force 10% of users to have 420 in their name
	// force 20% of users to have no number in their name

	var numberDecider = Math.floor(Math.random()*9);

	if(numberDecider == 0 || numberDecider == 1) {
		number = "";
	} else if(numberDecider == 2) {
		number = 69;
	} else if(numberDecider == 3) {
		number = 420;
	} else {
		number = Math.floor(Math.random()*1000);
	}


	var username = adjective + noun.toLowerCase() + number;

	return username;

};

Chatter.prototype.generateColor = function() {

	// var colors = new Array("Blue", "Coral", "DodgerBlue", "SpringGreen", "YellowGreen", "Green", "OrangeRed", "Red", "GoldenRod", "HotPink", "CadetBlue", "SeaGreen", "Chocolate", "BlueViolet", "Firebrick");
	var colors = new Array("0000FF", "FF7F50", "1E90FF", "00FF7F", "9ACD32", "008000", "FF4500", "FF0000", "DAA520", "FF69B4", "5F9EA0", "2E8B57", "D2691E", "8A2BE2", "B22222");

	var colorIndex = Math.floor(Math.random()*colors.length);

	return "#" + colors[colorIndex];
};

Chatter.prototype.speak = function() {

	// check if we're gonna do the main meme or not
	// currently 33% chance
	var mainMemeDecider = Math.floor(Math.random()*2);

	var chatMessage;

	// we're copying the main meme!
	if(mainMemeDecider == 0 && mainMemeIndex != undefined && mainMemeDuration >= 0) {
		chatMessage = this.messages[mainMemeIndex];
		mainMemeDuration--;
	} else {
		// randomly grab a message from message array
		var messageDecider = Math.floor(Math.random()*this.messages.length);
		chatMessage = this.messages[messageDecider];

		var mainMemeOverwriteDecider = Math.floor(Math.random()*50);

		// let's start a new main meme!
		if(mainMemeOverwriteDecider == 0) {
			mainMemeIndex = messageDecider;
			mainMemeDuration = mainMemeDurationStartValue;
			console.log("overwriting main meme! to: " + this.messages[messageDecider]);
		}

	}

	// append the message as a paragraph, including username and name color
	var stringToAppend = "<p><span style=\"font-weight:bold; color:" + this.color + ";\">" + this.name + "</span>: " + chatMessage + "</p>";
	$("#chat").append(stringToAppend);

	// grab chat height and wrapper height
	var chatHeight = $("#chat").height();

	var firstChildHeight = 0;

	// if chat height is over 3000 pixels, remove the first paragraph inside it
	if(chatHeight >= 3000) {
		firstChildHeight = $("#chat p:first-child").height() + 12;
		$("#chat p:first-child").remove();
	}

	var wrapperHeight = $("#chatWrapper").height();

	// calculate the new height of the chatbox based on how big the last message sent was
	var newHeight = chatHeight + $("#chat p:last-child").height() + 12 - firstChildHeight;

	// apply the new chatbox height
	$("#chat").css("height", newHeight);

	// if chat height is taller than the wrapper, force bottom alignment
	if(chatHeight >= wrapperHeight) {
		$("#chat").css("bottom", "0px");
	}
};

Chatter.prototype.attemptToSpeak = function() {

	var chatDecider = Math.floor(Math.random()*49);

	// let's chat!
	if(chatDecider == 3) {
		this.speak();
	}


};

// main logic
var chatters = new Array();
var mainMemeIndex;
var mainMemeDuration;
var mainMemeDurationStartValue = 50;

for(i = 0; i < 30; i++) {
	chatters.push(new Chatter());
}

function attemptToChat() {

	var speakDecider = Math.floor(Math.random()*3);

	if(speakDecider == 0) {
		var chatterPicker = Math.floor(Math.random()*chatters.length);

		chatters[chatterPicker].speak();

	}

}

setInterval(function() { attemptToChat(); }, 100);
