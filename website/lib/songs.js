/**
 * Created by Jeremy on 10/14/2015.
 */
Songs = new Mongo.Collection('songs');

Meteor.methods({
    // Use this method if you have the beatmap already
    addSongToPlaylist: function(name, artist, playlistId, songURL, beatMapURL, mp3File) {
        //var playlist = Playlists.find({_id: playlistId}).fetch()[0];

        //if(_.contains(playlist.members, Meteor.userId())) {
            Songs.insert({
                name: name,
                artist: artist,
                playlist: playlistId,
                url: songURL,
                map: beatMapURL
            });
        //}
    }

    
});