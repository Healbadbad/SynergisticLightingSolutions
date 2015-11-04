/**
 * Created by wrightjt on 10/15/2015.
 */

Session.set('playing-song', "");
musicPlayer = new Audio();


Template.navBarLoggedIn.events({
  	'click #logout': function(e) {
    	Meteor.logout();
    	Router.go('/');
  	},

	'click #backButton': function(e, template){
		//template.currentSong.set("testerino");
  	},

  	'click #nextButton': function(e, template){
  		//template.currentSong.set("Sandstorm - Darude");
  	},

    'click #playButton': function(e, template){
      // change play to pause or vice versa, and play/pause song
      template.playPause.set("fa-pause");
    }
});

Template.navBarLoggedIn.rendered = function(){
    $(document).foundation();

    var playPause = $("#playPauseIcon");
    $("#playButton").click(function(){
      isPlaying();
    });

    var song = "http://kolber.github.io/audiojs/demos/mp3/juicy.mp3";
    musicPlayer.src = song;
    musicPlayer.autoplay = false;

    function isPlaying(){
      var playButton = document.getElementById("playButton");
      if(playPause.attr("class").indexOf("play") > -1){
        playPause.attr("class", "fa fa-pause");
        playButton.style.fontSize = "70px";
        playButton.style.top = "-30%";
        //Meteor.call("playSong", song);
        $.getJSON(url, function (data) {
            Meteor.call('algorithmExponential', data.beats, data.segments);
            musicPlayer.play();
        });
      } else {
        playPause.attr("class", "fa fa-play-circle");
        playButton.style.fontSize = "100px";
        playButton.style.top = "-70%";
        Meteor.call("pauseSong");
        musicPlayer.pause();
      }
    }

}

Template.navBarLoggedIn.onCreated(function(){
	//this.currentSong = new ReactiveVar("Sandstorm - Darude");
  this.playPause = new ReactiveVar("fa-play-circle");
});

Template.navBarLoggedIn.helpers({
	getCurrentSong: function(){
		//console.log(Template.instance().currentSong.get());
        musicPlayer.src = Session.get('playing-song');
		return Session.get('song-name');
	}
});
