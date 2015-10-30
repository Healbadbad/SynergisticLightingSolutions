/**
 * Created by wrightjt on 10/15/2015.
 */
function resetNumberOfLEDS() {
	var numberOfLEDS = getNumberOfLEDS();
	$('#led-input').val(numberOfLEDS);
	if (numberOfLEDS >= 0) {
		$('#led-error').hide();
		$('#update-number-leds-button').prop('disabled', false);
	} else {
		$('#led-error').show();
		$('#update-number-leds-button').prop('disabled', true);
	}
}

function getNumberOfLEDS() {
	// TODO
	return 42;
}

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
	'click #settingsButton' : function() {
		$('#settings').foundation("reveal", "open");
		resetNumberOfLEDS();
	}
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


