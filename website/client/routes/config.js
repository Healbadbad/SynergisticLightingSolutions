/**
 * Created by wrightjt on 10/12/2015.
 */
Router.configure({
    onBeforeAction: function() {
        if(Meteor.user()) {
            console.log(Meteor.user());
            this.layout('navBarLoggedIn');
        } else {
            console.log("Not logged in");
            this.layout('navBar');
        }
        console.log("next");
        this.next();
    },
    notFoundTemplate: 'notfound',
    loadingTemplate: 'loading'
});

Router.onBeforeAction('dataNotFound');



