//background.js
chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({color: '#3aa757'}, function() {
      console.log('The color is green.');
    });
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
		new chrome.declarativeContent.ShowPageAction();
		chrome.declarativeContent.onPageChanged.addRules([{
		  conditions: [new chrome.declarativeContent.PageStateMatcher({
		  })
		  ],
			  actions: [new chrome.declarativeContent.ShowPageAction()]
		}]);
	  });
	  var snippetArray = [];
	  chrome.storage.sync.set({"email": ""});
	  chrome.storage.sync.set({"snippets": snippetArray});
  });

function checkLatestVideos(channelID) {
	$.ajax({
		type: 'GET',
		url: 'https://www.googleapis.com/youtube/v3/search',
		data: {
			key: 'AIzaSyAHUITXF9oo2Ed24HO1IrDRtYqNLv15_b8',
			channelId: channelID,
			part: 'snippet',
			maxResults: 5,
			type: 'video',
			order: 'date',
		},
		success: function(data){
			if (data.items.length > 0) {
				var trailers = ["trailer", "teaser", "first look"]; //subject to more, and in future ML model to determine keywords that represent trailer
				var i;
				for (i = 0; i < data.items.length; i++) {
					var snip = data.items[i].snippet; 
					var time = decodeHTMLEntities(snip.publishedAt);
					var date = new Date(time);
					var currentDate = new Date();
					var secondsDifference = Math.abs(date.getTime() - currentDate.getTime()) / 1000;
					if (secondsDifference < 60) { // TODO: decide a margin period
						var title = snip.title.toLowerCase();
						for(j = 0; j < trailers.length; j++)
						{
							if(title.contains(curr))
							{

							}
						}
						//if title.lowercase.contains [trailers word], send email with that info
						chrome.storage.sync.get("email", function(result) {
							sendEmail("Hello World!", result.email);
						});
					}
				}
			}
		},
		error: function(response){
			console.log("Request Failed");
		}
	  });
}

function sendEmail(body, recepient) {
	Email.send({
	SecureToken : "c12b00bb-a381-4628-97ab-07032d1c145e",
	To : recepient,
	From : "myvideocentral2020@gmail.com",
	Subject : "Test Email",
	Body : body,
	}).then(
		message => alert("mail sent successfully")
	);
}

function decodeHTMLEntities(text) {
	var textArea = document.createElement('textarea');
	textArea.innerHTML = text;
	return textArea.value;
}


setInterval(function() {
	chrome.storage.sync.get("snippets", function(result){
		if (result.snippets.length > 0) {
			var i;
			var snippet = result.snippets;
			for (i = 0; i < snippet.length; i++) {
				checkLatestVideos(snippet[i].channelID);
			}
		}
	});
}, 60000);

var oldTime = new Date();
//getLatestVideoTimes("UCshoKvlZGZ20rVgazZp5vnQ");
var newTime = new Date();
//alert(Math.abs(oldTime.getTime() - newTime.getTime()) / 1000);

/*x = 1;
while (x == 1) {
	var date = new Date();
	if (date.getMinutes() >= 19) {
		alert(date.getMinutes());
		break;
	}
	//x++;
}*/