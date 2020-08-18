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
	  var playListArray = ["UUshoKvlZGZ20rVgazZp5vnQ"];
	  chrome.storage.sync.set({"email": "hummerrocket@gmail.com"});
	  chrome.storage.sync.set({"snippets": snippetArray});
	  chrome.storage.sync.set({"playlistIds": playListArray});
  });

function checkLatestVideos(currentPlaylistId) {
	$.ajax({
		type: 'GET',
		url: 'https://www.googleapis.com/youtube/v3/playlistItems',
		data: {
			key: 'AIzaSyAHUITXF9oo2Ed24HO1IrDRtYqNLv15_b8',
			playlistId: currentPlaylistId,
			part: 'snippet',
			maxResults: 5,
		},
		success: function(data){
			if (data.items.length > 0) {
				 //subject to more, and in future ML model to determine keywords that represent trailer
				var i;
				var curr;
				for (i = 0; i < data.items.length; i++) {
					var snip = data.items[i].snippet; 
					var time = decodeHTMLEntities(snip.publishedAt);
					var date = new Date(time);
					var currentDate = new Date();
					var minutesDifference = Math.floor(Math.abs(date.getTime() - currentDate.getTime()) / 60000);
					if (minutesDifference < 30) { // TODO: decide a margin period
						var title = snip.title.toLowerCase();
						//if (title == "optical illusions in minecraft") {
						if(checkIfTrailer(title)) {
							var tempId = snip.resourceId.videoId;
							chrome.storage.sync.get("email", function(result) {
								sendEmail("A new trailer has been posted on " + snip.channelTitle + "! Check it out here: www.youtube.com/watch?v=" + tempId, result.email);
							});
						}
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

function checkIfTrailer(title) {
	var trailers = ["trailer", "teaser", "first look", "tv spot", "preview", "sneak peak"];
	var i;
	for (i = 0; i < trailers.length; i++) {
		if (title.includes(trailers[i])) {
			return true;
		}
	}
	return false;
}

setInterval(function() {
	chrome.storage.sync.get("playlistIds", function(result){
		if (result.playlistIds.length > 0) {
			var i;
			var playlistIds = result.playlistIds;
			for (i = 0; i < playlistIds.length; i++) {
				//alert(playlistIds[i]);
				checkLatestVideos(playlistIds[i]);
			}
		}
	});
	/*chrome.storage.sync.get("snippets", function(result){
		if (result.snippets.length > 0) {
			var i;
			var snippet = result.snippets;
			for (i = 0; i < snippet.length; i++) {
				checkLatestVideos(snippet[i].channelId);
			}
		}
	});*/
}, 6000);