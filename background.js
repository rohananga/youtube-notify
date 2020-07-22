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

function getChannel(username) {
	$.ajax({
	  type: 'GET',
	  url: 'https://www.googleapis.com/youtube/v3/search',
	  data: {
		  key: 'AIzaSyAHUITXF9oo2Ed24HO1IrDRtYqNLv15_b8',
		  q: username,
		  part: 'snippet',
		  maxResults: 5,
		  type: 'channel',
	  },
	  success: function(data){
		  alert("Success!");
	  },
	  error: function(response){
		  console.log("Request Failed");
	  }
	});
  }

function sendEmail() {
	Email.send({
	SecureToken : "c12b00bb-a381-4628-97ab-07032d1c145e",
	To : 'rohankms@gmail.com',
	From : "myvideocentral2020@gmail.com",
	Subject : "Test Email",
	Body : "hey there this is a test",
	}).then(
		message => alert("mail sent successfully")
	);
}
