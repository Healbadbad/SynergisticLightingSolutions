/**
 * Created by wrightjt on 10/15/2015.
 */
Template.passwordCheck.onRendered(function() {
    $('#registerButton').prop('disabled', true);
    $('#existingUsernameError').hide();

});

Template.passwordCheck.helpers({
   isSamePassword: function() {
       return $('#newPassword').val() == $('#rePassword').val();
   }
});

Template.passwordCheck.events({
    'keyup #newPassword': function(e) {
        //console.log(e.target.value);
        passwordQualityCheck();
        if(exists(e.target.value)) {
            $('#newPasswordCheck').show();
            $('#newPasswordError').hide();
            if(isSamePassword()) {
                deleteErrors();
            } else {
                displayPasswordError();
                $('#rePasswordCheck').hide();
            }
        } else {
            $('#newPasswordCheck').hide();
            $('#newPasswordError').show();
        }
    },

    'keyup #rePassword': function(e) {
        if(exists(e.target.value)) {
            if (isSamePassword()) {
                deleteErrors();

            } else {
                displayPasswordError();
                $('#rePasswordCheck').hide();
            }
        } else {
            $('#rePasswordCheck').hide();
            $('#rePasswordError').show();
        }
    },

    'keyup #newUsername': function(e) {
        if(exists(e.target.value)) {
            $('#newUsernameError').hide();
            $('#newUsernameCheck').show();
        } else {
            $('#newUsernameError').show();
            $('#newUsernameCheck').hide();
        }

        var existingUser = Meteor.users.find({username: e.target.value}).fetch();


        if(_.isEmpty(existingUser)) {
            $('#existingUsernameError').hide();
        } else {
            $('#existingUsernameError').show();
            $('#registerButton').prop('disabled', true);

            $('#newUsernameCheck').hide();
        }

    }
});

function exists(value) {
    return (value != null && value != "");
}


function isSamePassword() {
    return $('#newPassword').val() == $('#rePassword').val()
}

function displayPasswordError() {
    $('#rePasswordError').show();
    $('#registerButton').prop('disabled', true);
}

function deleteErrors() {
    $('#newPasswordError').hide();
    $('#rePasswordError').hide();

    $('#newPasswordCheck').show();
    $('#rePasswordCheck').show();

    $('#registerButton').prop('disabled', false);

    // Had to stop. The spaghetti wouldn't let me continue.

}

function passwordQualityCheck(){
    var password = $("#newPassword").val();
    if(password != null){
        var pass = [];
        var numberCount = password.match(/[0-9]/g) != null ? password.match(/[0-9]/g).length : 0;
        var capitalLetters = password.match(/[A-Z]/g)!= null ? password.match(/[A-Z]/g).length : 0;
        var lowercaseLetters = password.match(/[a-z]/g) != null ? password.match(/[a-z]/g).length : 0;
        var specialCharacters = password.match(/[^a-zA-Z0-9]/g) != null ? password.match(/[^a-zA-Z0-9]/g).length : 0;

        if(numberCount > 0){
            pass.push(numberCount);
        }
        if(capitalLetters > 0){
            pass.push(capitalLetters);
        }
        if(lowercaseLetters > 0){
            pass.push(lowercaseLetters);
        }
        if(specialCharacters > 0){
            pass.push(specialCharacters);
        }

        if(pass.length == 4){
            // $("#strength-bar").toggleClass("very-strong");
            $("#strength-bar").attr("class", "very-strong");
            $("#strength").html("Very Strong");
        } else if(pass.length == 3){
            $("#strength-bar").attr("class", "strong");
            $("#strength").html("Strong");
        } else if(pass.length == 2){
            $("#strength-bar").attr("class", "good");
            $("#strength").html("Good");
        }else if(pass.length == 1){
            $("#strength-bar").attr("class", "weak");
            $("#strength").html("Weak");
        } else if(pass.length == 0){
            $("#strength-bar").attr("class", "none");
            $("#strength").html("None");
        }
    }
}