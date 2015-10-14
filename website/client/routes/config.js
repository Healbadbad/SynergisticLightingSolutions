/**
 * Created by wrightjt on 10/12/2015.
 */
Router.configure({
    onBeforeAction: function() {
        if(Meteor.user()) {
            console.log(Meteor.user());
            this.layout('nav-bar-logged-in');
        } else {
            console.log("Not logged in");
            this.layout('nav-bar');
        }
        console.log("next");
        this.next();
    },
    notFoundTemplate: 'notfound',
    loadingTemplate: 'loading'
});

Router.onBeforeAction('dataNotFound');



