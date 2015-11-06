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
})

//Meteor.publish('playlistSongs', function(playlistId) {
//    return Songs.find({