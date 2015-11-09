/**
 * Created by wrightjt on 10/13/2015.
 */
Playlists = new Mongo.Collection('playlists');

Meteor.methods({
    addPlaylist: function(id, name, owner, members, songs, authorizedUserIds) {
        Playlists.insert({
            'userId': id,
            'name': name,
            'owner': owner,
            'members': members,
            'songs': songs,
            'authorizedUserIds' : authorizedUserIds
        });
    }
});
