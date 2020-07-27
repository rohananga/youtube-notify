async function getChannels(username) {
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
	var edit = document.getElementById('editButton');
	var cancel = document.getElementById('cancelButton');
	var channel1 = document.getElementById('Channel1');
	var search = document.getElementById('searchButton');

	search.addEventListener('click', function() {
		var channelName = document.getElementById('inputSearch').value;
		(async () => {
			if (/\S/.test(channelName)) {
				result = await getChannels(channelName);
				//alert(result.items[0].snippet.title);
				// TODO: create for loop of 10 that displays channel names, descriptions, and images
				var i;
				for (i = 0; i < 5; i++) {
					var html = '<div class="card flex-row flex-wrap">' +
							'<div class="card-header border-0">' +
							'<img src=' + result.items[i].snippet.thumbnails.default.url + ' alt="" width = "80px" height = "80px">' +
							'</div>' +
							'<div class="card-block px-2" style ="width: 300px;">' +
							' <h5 class="card-title">'+result.items[i].snippet.title+'</h5>' +
							'<p class="card-text"><small>' +result.items[i].snippet.description + '</small></p>' +
							'</div>' +
							'<button type="button" class="btn btn-primary mb-2" style = "max-height:40px">+</button>' +
							'</div>';
					addElement('results','div','example', html);	
				}		
				/*for (i = 0; i < 10; i++) {
					var html;
				}*/
			}
		})()
	});


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

function decodeHTMLEntities(text) {
	var textArea = document.createElement('textarea');
	textArea.innerHTML = text;
	return textArea.value;
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