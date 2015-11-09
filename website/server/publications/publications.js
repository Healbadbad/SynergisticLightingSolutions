Meteor.publish('allPlaylists', function() {
    return Playlists.find({});
});

Meteor.publish('allSongs', function() {
    return Songs.find({});
});

Meteor.publish('playlistSongs', function(id) {
    return Songs.find({playlist: {$elemMatch: {$eq : id}}});
});

Meteor.publish('getPlaylist', function(owner) {
    return Playlists.find({owner: owner});
});

Meteor.publish('getPlaylistById', function(id) {
   return Playlists.find({_id: id});
});

Meteor.publish('getSongsFromPlaylist', function(id) {
    var playlistArray = Playlists.find({_id: id}).fetch()[0].songs;
    return Songs.find({_id: {$in: playlistArray}});
});

//Meteor.publish('playlistSongs', function(playlistId) {
//    return Songs.find({