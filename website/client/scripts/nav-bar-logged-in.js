/**
 * Created by wrightjt on 10/15/2015.
 */
Template.navBarLoggedIn.events({
  	'click #logout': function(e) {
    	Meteor.logout();
    	Router.go('/');
  	},

	'click #backButton': function(e, template){
		template.currentSong.set("testerino");
  	},

  	'click #nextButton': function(e, template){
  		template.currentSong.set("Sandstorm - Darude");
  	},
});


// Template.navBarLoggedIn.created = function () {
// 	this.currentSong = new ReactiveVar("test");
// };

Template.navBarLoggedIn.onCreated(function(){
	this.currentSong = new ReactiveVar("Sandstorm - Darude");
});

Template.navBarLoggedIn.helpers({
	getCurrentSong: function(){
		//console.log(Template.instance().currentSong.get());
		return Template.instance().currentSong.get();
	},

});