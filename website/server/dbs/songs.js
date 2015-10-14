/**
 * Created by Jeremy on 10/14/2015.
 */
var Songs = new Mongo.Collection('songs');

Meteor.methods({
    // Use this method if you have the beatmap already
    addSongToPlaylist: function(playlist, songURL, beatMap) {
        Songs.insert({playlist: playlist, url: songURL, map: beatMap});
    }

    
});