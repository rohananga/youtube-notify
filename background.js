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
  });

function getLatestVideoTimes(channelID) {
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
			var time = decodeHTMLEntities(data.items[0].snippet.publishedAt);
			var date = new Date(time);
			var currentDate = new Date();
			var secondsDifference = Math.abs(date.getTime() - currentDate.getTime()) / 1000;
			if (secondsDifference < 60) {

			}
		},
		error: function(response){
			console.log("Request Failed");
		}
	  });
}

function sendEmail(body) {
	Email.send({
	SecureToken : "c12b00bb-a381-4628-97ab-07032d1c145e",
	To : '',
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

var oldTime = new Date();
getLatestVideoTimes("UCshoKvlZGZ20rVgazZp5vnQ");
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