/**
 * Created by Jeremy on 10/14/2015.
 */
var Songs = new Mongo.Collection('songs');

Meteor.methods({
    // Use this method if you have the beatmap already
    addSongToPlaylist: function(playlistId, songURL, beatMapURL, mp3File) {
        //var playlist = Playlists.find({_id: playlistId}).fetch()[0];

        //if(_.contains(playlist.members, Meteor.userId())) {
            Songs.insert({
                playlist: playlistId,
                url: songURL,
                map: beatMapURL,
                songFile: mp3File
            });
        //}
    }

    
});