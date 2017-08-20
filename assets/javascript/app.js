var page = {
	topics: ["baguazhang", "taijiquan", "xingyiquan", "qigong", "yiquan", "neigong"],
	newSubject: "",
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
			page.newSubject = $('#newSubject').val();
			console.log(page.newSubject);
		});
	}


}








$('document').ready(function() {
	page.drawButtons();
	page.createNewButton();

}); 


	
