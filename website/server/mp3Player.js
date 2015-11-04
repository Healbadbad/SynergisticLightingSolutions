/**
 * Created by Jeremy on 10/23/2015.
// */

Meteor.methods({


   'playSong': function(file) {
     console.log("play");
     var Player = Npm.require('player');
      //  Meteor.npmRequire('Audio');

      //  var audio = new Audio(file);
      //  audio.play();
   },

   'pauseSong': function(file) {
     console.log('pause');
   }
});
