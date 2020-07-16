//background.js

function sendEmail() {
	Email.send({
	Host: "smtp.gmail.com",
	Username : "amarmuju@terpmail.umd.edu",
	Password : "<>",
	To : 'hummerrocket@gmail.com',
	From : "",
	Subject : "<email subject>",
	Body : "<email body>",
	}).then(
		message => alert("mail sent successfully")
	);
}

sendEmail();