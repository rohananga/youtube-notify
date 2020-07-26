async function getChannel(username) {
	let result;

	try {
		result = await $.ajax({
			type: 'GET',
			url: 'https://www.googleapis.com/youtube/v3/search',
			data: {
				key: 'AIzaSyAHUITXF9oo2Ed24HO1IrDRtYqNLv15_b8',
				q: username,
				part: 'snippet',
				maxResults: 5,
				type: 'channel',
				datatype: 'json',
			}
		});
		
		return result;
	} catch (error) {
		console.log("Request failed.");
	}
  }

  /*chrome.runtime.onStartup.addListener(function() {
	chrome.storage.sync.get("email", function(result) {
		document.getElementById('inputEmail').placeholder = result;
		alert(result);
	});
  })*/

  document.addEventListener('DOMContentLoaded', function() {
    var edit = document.getElementById('editButton');
	
	
	edit.addEventListener('click', function() {
		var editButton = document.getElementById('editButton');
		var cancelButton = document.getElementById('cancelButton');
		var emailBox = document.getElementById('inputEmail');
		if (editButton.innerHTML == "Edit") {
			editButton.innerHTML = "Save";
			if (emailBox.readOnly) {
				emailBox.placeholder = "Enter Email Here";
				if (emailBox.value == null || emailBox.value.length < 1) {
					chrome.storage.sync.set({"email": ""});
				}
				emailBox.readOnly = false;
				cancelButton.hidden = false;
			}
		} else {
			editButton.innerHTML = "Edit";
			if (!emailBox.readOnly) {
				if (emailBox.value != null && emailBox.value.length > 0) {
					emailBox.value = emailBox.value;
					chrome.storage.sync.set({"email": emailBox.value});
				} else {
					emailBox.value = "";
					chrome.storage.sync.set({"email": ""});
				}
				emailBox.readOnly = true;
				cancelButton.hidden = true;
			}
		}
    });
});

 /* var x = 3;
  (async () => {
	const result = await getChannel("Netflix");
	//alert(result.items[0].snippet.title);
})()*/

chrome.storage.sync.get("email", function(result) {
	if (document.getElementById('inputEmail').value != null && document.getElementById('inputEmail').value != "") {
		document.getElementById('inputEmail').placeholder = result.email;
	} else {
		document.getElementById('inputEmail').placeholder = "Enter Email Here";
	}
	document.getElementById('inputEmail').value = result.email;
});