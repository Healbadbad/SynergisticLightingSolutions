/**
 * Created by wrightjt on 10/12/2015.
 */
Router.configure({
    notFoundTemplate: 'notfound',
    loadingTemplate: 'loading'
    //waitOn: function() {
    //    //return Meteor.subscribe('allSongs');
    //}
});

Router.onBeforeAction(function() {
    if(Meteor.loggingIn() || Meteor.userId()) {
        this.layout('navBarLoggedIn');
        this.next();

    } else {
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
