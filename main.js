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
	var edit = document.getElementById('editButton'),
		cancel = document.getElementById('cancelButton'),
		minusButton = document.getElementById('minusButton1'),
		channel2minus = document.getElementById('minusButton2'),
		channel3minus = document.getElementById('minusButton3'),
		search = document.getElementById('searchButton'),
		clear = document.getElementById('clearButton');

	search.addEventListener('click', function() {
		var channelName = document.getElementById('inputSearch').value;
		(async () => {
			if (/\S/.test(channelName)) {
				var i, j, html;
				for (j = 1; j < 6; j++) {
					if (document.getElementById('result#' + j) != null) {
						removeElement('result#' + j);
					}
				}
				var result = await getChannels(channelName), items = result.items; //what does await do?
				var newRowHtml, rowParaHtml;
				const num = [0, 1, 2, 3, 4];
				num.forEach(i => {
					if (items[i] != null) {
						html = '<div class="card flex-row flex-wrap">' +
							'<div class="card-header border-0">' +
							'<img src=' + items[i].snippet.thumbnails.medium.url + ' alt="" width = "80px" height = "80px">' +
							'</div>' +
							'<div class="card-block px-2" style ="width: 300px;">' +
							' <h5 class="card-title">'+items[i].snippet.title+'</h5>' +
							'<p class="card-text"><small>' +items[i].snippet.description + '</small></p>' +
							'</div>' +
							'<button type="button" class="btn btn-primary mb-2" id="addButton#'+ (i + 1) + '" style = "max-height:40px">+</button>' +
							'</div>';
						addElement('results','div','result#' + (i + 1), html);	
						document.getElementById('addButton#' + (i + 1)).addEventListener('click', function() {
							newCardHtml ='<div class="card card-body container-fluid" id = "Channel'+items[i].snippet.channelId+'"><div class = "row"><button type="button" class="btn btn-primary mb-2" id="minusButton" style="margin:5px;">-</button>'+'<img src=' + items[i].snippet.thumbnails.medium.url + ' alt="" width = "80px" height = "80px">'+'<p style="font-size:25px">'+items[i].snippet.title+'</p></div></div>';
							addElement('channelCollapse','div','channel#'+items[i].snippet.channelId,newCardHtml);
							//addElement('Channel'+items[i].snippet.channelId,'p','channelTitle'+ items[i].snippet.channelId,rowParaHtml);
							var currCard = document.getElementById('channel#'+items[i].snippet.channelId);
							//var currTitle = document.getElementById('rowChannel'+i);
							//currCard.style.display = 'block';
							//currTitle.style.display = 'block';
							//document.getElementById('para_channel'+items[i].snippet.channelId).innerHTML = ""+items[i].snippet.title;
							//Note to Amar: I also tried using addElement method for the paragraph, adding to element w/ id = "row" + i, same result
							chrome.storage.sync.get('channelIDs', function(result) {
								result.channelIDs.push(items[i].snippet.channelId);
								chrome.storage.sync.set({"channelIDs": result.channelIDs});
							});
							removeElement('result#' + (i + 1));
						});
					}
				})
			}
		})()
	});

	//addElement('channelCollapse','channel_'+channelId,'div','')

	clear.addEventListener('click', function() {
		var j;
		for (j = 1; j < 6; j++) {
			if (document.getElementById('result#' + j) != null) {
				removeElement('result#' + j);
			}
		}
		document.getElementById('inputSearch').value = "";
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

	minusButton.addEventListener('click', function(){
		console.log('it happened');
		minusButton.parentNode.parentNode.parentNode.removeChild(minusButton.parentNode.parentNode);
		//removeChannel('Channel1');
		//channel1.style.color = "red";
	});

	channel2minus.addEventListener('click', function(){
		removeChannel('Channel2');
		//channel1.style.color = "red";
	});

	channel3minus.addEventListener('click', function(){
		removeChannel('Channel3');
		//channel1.style.color = "red";
	});

	function removeChannel(channelId)
	{
		var currCard = document.getElementById(channelId);
		currCard.style.display = 'none';
	}
	
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
	console.log(parentId);
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