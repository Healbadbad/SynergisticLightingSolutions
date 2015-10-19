/**
 * Created by wrightjt on 10/15/2015.
 */
Template.navBarLoggedIn.events({
  'click #logout': function(e) {
      Meteor.logout();
      Router.go('/');
  }
});