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


  document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('editButton');
	var channel1 = document.getElementById('Channel1');
  });
  /*chrome.runtime.onStartup.addListener(function() {
	chrome.storage.sync.get("email", function(result) {
		document.getElementById('inputEmail').placeholder = result;
		alert(result);
	});
  })*/

  document.addEventListener('DOMContentLoaded', function() {
	var edit = document.getElementById('editButton');
	var cancel = document.getElementById('cancelButton');
	var channel1 = document.getElementById('Channel1');


	cancel.addEventListener('click', function(){
		cancelButton.hidden = true;
		document.getElementById('inputEmail').readOnly = true;
		edit.innerHTML = "Edit";
		chrome.storage.sync.get("email", function(result) {
			var inputEmail = document.getElementById('inputEmail');
			inputEmail.placeholder = (inputEmail.value != null && inputEmail.value != "") ? result.email : "Enter Email Here";
			inputEmail.value = result.email;
		});
	});

	channel1.addEventListener('click', function(){
		console.log("Channel click recognized");
		channel1.style.color = "red";
		document.write("<button class=\"btn btn-primary\" type=\"button\"> Boi");
	});
	
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
function addElement(parentId, elementTag, elementId, html) {
    // Adds an element to the document
    var p = document.getElementById(parentId);
    var newElement = document.createElement(elementTag);
    newElement.setAttribute('id', elementId);
    newElement.innerHTML = html;
    p.appendChild(newElement);
}

function removeElement(elementId) {
    // Removes an element from the document
    var element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
}
 /* (async () => {
	const result = await getChannel("Netflix");
	//alert(result.items[0].snippet.title);
})()*/

chrome.storage.sync.get("email", function(result) {
	var inputEmail = document.getElementById('inputEmail');
	inputEmail.placeholder = (inputEmail.value != null && inputEmail.value != "") ? result.email : "Enter Email Here";
	inputEmail.value = result.email;
});