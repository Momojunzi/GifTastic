var page = {
	topics: ["ferrari", "mclaren", "porsche", "lamborghini"],
	drawButtons: function() {
		for (var index=0; index<page.topics.length; index++) {
			var subject = page.topics[index];
			var subjectButton = $('<button type="submit" class="btn btn-primary subjectButton" data-name="' + subject + '" id="' + subject + '" >' + subject + '</button>');
			$('#button-div').append(subjectButton);
		}
		page.addGifs();
	},
	createNewButton: function() {
		$('#submitBtn').on('click', function(event) {
			event.preventDefault();
			var newSubject = $('#newSubject').val();
			page.topics.push(newSubject);
			$('#button-div').empty();
			page.drawButtons();
		});
	},
	addGifs: function() {
		$('.subjectButton').on('click', function(event) {
			event.preventDefault();
			var search = $(this).data('name');
			var gifDiv = $('#gif-div');
			gifDiv.empty();
			page.calltoGiphy(search);
		});
	},
	calltoGiphy: function(subject) {
		var queryUrl = 'https://api.giphy.com/v1/gifs/search?api_key=3f9c578902254c4ea2a926268877d6b8&q=' + subject + '&limit=10';
		$.ajax({
			url: queryUrl,
			method: 'GET'
		}).done(function(response) {
			var gifArr = response.data;
			for (var index=0; index<gifArr.length; index++) {
				var still = gifArr[index].images.downsized_still.url;
				var gif = gifArr[index].images.downsized.url;
				var rating = gifArr[index].rating;
				page.appendGif(still, gif, rating);
			}
			page.playOrPause();
		});
	},
	appendGif: function(stillUrl, gifUrl, rating) {
		var gifContainer = $('<div class="col-md-6 gif-container">');
		var gifImg = $('<figure><img class="img-fluid gif" data-state="still" data-still=' + stillUrl + ' data-animate=' + gifUrl + ' src=' + stillUrl + '>' + 
			'<figcaption>' + rating + '</figcaption></figure>');
		var parent = $('#gif-div');
		gifContainer.html(gifImg);
		parent.prepend(gifContainer);
		
	},
	playOrPause: function() {
		$('.gif').on('click', function() {
			var clicked = $(this);
			var state = clicked.data('state');
			
			if(state === 'still'){
				clicked.attr('src', clicked.data('animate')); 
				clicked.data('state', 'animate');
			}
			if(state === 'animate'){
				clicked.attr('src', clicked.data('still'));
				clicked.data('state', 'still');
			}
		});
	}


}








$('document').ready(function() {
	page.drawButtons();
	page.createNewButton();
}); 


	
