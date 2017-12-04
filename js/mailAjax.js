function mailerAjax(){
	$.ajax({
		url: 'mail/mail_handler.php',
		method: 'post',
		data:{
			'name': 'collinsbackendcaneatit',
			'message': 'email message thing',
			'email': '1@testemail.'
		},
		success: function(data){
			console.log(data);
		},
		error: function(err){
			console.log(err.responseText);
		}
	});
}

$(document).ready(function(){
	
	$('#emailSubmit').click((e)=>{
		e.preventDefault();
		const email = $('#email').val();
		// console.log(email);

		$.ajax({
			url: 'mail/mail_handler.php',
			method: 'post',
			data:{
				email: email
			},
			success: function(data){
				console.log(data);
			},
			error: function(err){
				console.log(err);
			}
		});
	});

});