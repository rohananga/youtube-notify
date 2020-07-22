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
	  success: function(channel){
		  alert(channel.items[0].snippet.title);
	  },
	  error: function(response){
		  console.log("Request Failed");
	  }
	});
  }

  //getChannel("Netflix");