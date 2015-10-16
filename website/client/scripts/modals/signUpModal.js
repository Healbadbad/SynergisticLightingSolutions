/**
 * Created by wrightjt on 10/15/2015.
 */
Template.signUpModal.events({
    'click #registerButton': function(e) {
        e.stopPropagation();
        e.preventDefault();

        username = $('#newUsername')[0].value;
        password = $('#newPassword')[0].value;

        Accounts.createUser({username: username, password: password, email: "", profile: {}});

        $('body').trigger({
            type: 'keyup',
            which: 27 // Escape key
        });

        Router.go('/dashboard');
    },

    'click .cancel': function(e) {
        e.preventDefault();
        $('body').trigger({
            type: 'keyup',
            which: 27 // Escape key
        });
        e.stopPropagation();
    }
});