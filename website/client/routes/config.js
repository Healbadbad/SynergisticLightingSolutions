/**
 * Created by wrightjt on 10/12/2015.
 */
Router.configure({
    notFoundTemplate: 'notfound',
    loadingTemplate: 'loading'
});

Router.onBeforeAction(function() {
    if(Meteor.loggingIn() || Meteor.userId()) {
        console.log(Meteor.loggingIn());
        this.layout('navBarLoggedIn');
        this.next();

    } else {
        console.log('ELSE');
        console.log("Not logged in");
        this.layout('navBar');
        this.render('notLoggedIn');
    }

}, {except: ['home', 'guides', 'tests']});



//Router.onBeforeAction(function() {
//    if(Meteor.logginIn() || Meteor.user()) {
//        this.layout('navBarLoggedIn');
//    } else {
//        this.layout('navBar');
//    }
//    this.next();
//}, {only: ['home', 'guides', 'tests']});
