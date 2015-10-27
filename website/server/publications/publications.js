Meteor.publish('allPlaylists', function() {
    return Playlists.find({});
});

//Meteor.publish('playlistSongs', function(playlistId) {
//    return Songs.find({