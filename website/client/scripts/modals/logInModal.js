/**
 * Created by wrightjt on 10/15/2015.
 */
Template.logInModal.events({
    'click #loginButton': function(e) {
        e.preventDefault();
        e.stopPropagation();

        $('body').trigger({
            type: 'keyup',
            which: 27 // Escape key
        });

        username = $('#username')[0].value;
        password = $('#password')[0].value;

        Meteor.loginWithPassword(username, password, function(err) {
            if(err) {

            } else {
                Router.go('/dashboard');
            }
        });
    },

    'click .cancel': function(e) {
        $('body').trigger({
            type: 'keyup',
            which: 27 // Escape key
        });
    },

    'keydown input': function(e) {
        if(e.keyCode == 13) {
            $('#loginButton').click();
        }
    }
});