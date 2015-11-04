Meteor.publish('allPlaylists', function() {
    return Playlists.find({});
});

Meteor.publish('playlistSongs', function(id) {
   return Songs.find({})
});

//Meteor.publish('playlistSongs', function(playlistId) {
//    return Songs.find({