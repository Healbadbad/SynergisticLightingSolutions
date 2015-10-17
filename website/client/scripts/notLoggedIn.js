/**
 * Created by wrightjt on 10/17/2015.
 */
Template.notLoggedIn.events({
   'click #logInButton': function() {
       $('#logIn').foundation("reveal", "open");
   }
});