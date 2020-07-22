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