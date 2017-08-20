var page = {
	topics: ["bagua zhang", "tai chi", "hsing yi", "qigong", "yi quan"],
	drawButtons: function() {
		for (var index=0; index<page.topics.length; index++) {
			var subject = page.topics[index];
			var subjectButton = $('<button type="submit" class="btn btn-primary subjectButton" data-name=' + subject + ' id=' + subject + ' >' + subject + '</button>');
			$('#button-div').append(subjectButton);
		}
	},
	createNewButton: function() {
		$('#submitBtn').on('click', function(event) {
			event.preventDefault();
			var newSubject = $('#newSubject').val();
			page.topics.push(newSubject);
			var newButton = $('<button type="submit" class="btn btn-primary subjectButton" data-name=' + newSubject + ' id=' + newSubject + ' >' + newSubject + '</button>');
			$('#button-div').append(newButton);
			console.log(newSubject);
		});
	},
	addGifs: function() {
		$('.subjectButton').on('click', function(event) {
			event.preventDefault();
			var search = $(this).data('name');
			console.log(search);
			page.calltoGiphy(search);
		});
	},
	calltoGiphy: function(subject) {
		var queryUrl = 'https://api.giphy.com/v1/gifs/search?api_key=3f9c578902254c4ea2a926268877d6b8&q=' + subject + '&limit=10&offset=0&rating=G&lang=en';
		$.ajax({
			url: queryUrl,
			method: 'GET'
		}).done(function(response) {
			console.log(response);
			var gifArr = response.data;
			for (var index=0; index<gifArr.length; index++) {
				var still = gifArr[index].images.downsized_still.url;
				var gif = gifArr[index].images.downsized.url;
				page.appendGif(still, gif);
			}
		});
	},
	appendGif: function(stillUrl, gifUrl) {
		var gifContainer = $('<div class="col-md-6 gif-container">');
		var gifImg = $('<img class="img-fluid gif" data-still=' + stillUrl + ' data-animate=' + gifUrl + ' src=' + stillUrl + '>');
		var parent = $('#gif-div');
		gifContainer.html(gifImg);
		parent.prepend(gifContainer);
	}


}








$('document').ready(function() {
	page.drawButtons();
	page.createNewButton();
	page.addGifs();
}); 


	
