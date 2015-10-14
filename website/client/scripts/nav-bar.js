$(document).foundation();

function pressEsc() {
    $('body').trigger({
        type: 'keyup',
        which: 27 // Escape key
    });
}

Template.home.rendered = function() {
   $("#signUpModalButton").click(function(){
   		$("#signUp").foundation("reveal", "open");
   });

   $("#logInModalButton").click(function(){
   		$("#logIn").foundation("reveal", "open");
   });

   	inputFieldsCheck("newUsername");
	inputFieldsCheck("newPassword");
	inputFieldsCheck("rePassword");
	passwordQualityCheck();

	$(".cancel").unbind("click");
	$(".cancel").click(function(){
		pressEsc();
	});

	$("#registerButton").click(function(){
		// register button
	});

	$("#loginButton").click(function(){
		// login button
	});
};

Template.signUpModalInner.events({
	'click #registerButton': function(e) {
		e.stopPropagation();
		e.preventDefault();

		username = $('#newUsername')[0].value;
		password = $('#newPassword')[0].value;

		Accounts.createUser({username: username, password: password, email: "", profile: {}});

		pressEsc();

		Router.go('/dashboard');
	}
});


function inputFieldsCheck(input){
	$("#"+input).keyup(function(){
   		if($("#newPassword").val() != $("#rePassword").val()){
   			$("#rePasswordError").show();
   			$("#registerButton").prop("disabled", true);
   		} else {
   			if($("#newUsername").val() != null && $("#newUsername").val().length > 0){
   				$("#registerButton").prop("disabled", false);
   			} else {
   				$("#registerButton").prop("disabled", true);
   			}
   		}

   		if($("#"+input).val() != null && $("#"+input).val().length > 0){
   			if(input == "newUsername"){
   				$("#newUsernameError").hide();
   				$("#newUsernameCheck").show();
   			} else {
   				if($("#newPassword").val() != null){
   					$("#newPasswordError").hide();
   					$("#newPasswordCheck").show();
   				}
   				if($("#newPassword").val() == $("#rePassword").val()){
   					$("#rePasswordCheck").show();
   					$("#rePasswordError").hide();
   				} else {
   					$("#rePasswordCheck").hide();
   					$("#rePasswordError").show();
   				}
   			}
   		} else {
   			if(input == "newUsername"){
   				$("#newUsernameError").show();
   				$("#newUsernameCheck").hide();	
   			} else {
   				if(input == "newPassword"){
   					$("#newPasswordError").show();
   				}
   				$("#newPasswordCheck").hide();
   				$("#rePasswordCheck").hide();
   			}
   		}
   });
}

function passwordQualityCheck(){
	$("#newPassword").keyup(function(){
		var password = $("#newPassword").val();
		if(password != null){
			var numberCount = password.match(/[0-9]/g) != null ? password.match(/[0-9]/g).length : 0;
			var capitalLetters = password.match(/[A-Z]/g)!= null ? password.match(/[A-Z]/g).length : 0;
			var lowercaseLetters = password.match(/[a-z]/g) != null ? password.match(/[a-z]/g).length : 0;
			var specialCharacters = password.match(/[^a-zA-Z0-9]/g) != null ? password.match(/[^a-zA-Z0-9]/g).length : 0;
			
			if(numberCount > 0 && capitalLetters > 0 && lowercaseLetters > 0 && specialCharacters > 0){
				// $("#strength-bar").toggleClass("very-strong");
				$("#strength-bar").attr("class", "very-strong");
				$("#strength").html("Very Strong");
			} else if(numberCount > 0 && capitalLetters > 0 && lowercaseLetters > 0){
				$("#strength-bar").attr("class", "strong");
				$("#strength").html("Strong");
			} else if(capitalLetters > 0 && lowercaseLetters > 0){
				$("#strength-bar").attr("class", "good");
				$("#strength").html("Good");
			} else if(lowercaseLetters > 0){
				$("#strength-bar").attr("class", "weak");
				$("#strength").html("Weak");
			} else if(numberCount == 0 && capitalLetters == 0 && lowercaseLetters == 0 && specialCharacters == 0){
				$("#strength-bar").attr("class", "none");
				$("#strength").html("None");
			}
		}
	});
}