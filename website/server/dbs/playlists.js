/**
 * Created by wrightjt on 10/13/2015.
 */
var Playlists = new Mongo.Collection('playlists');

Meteor.methods({
    addPlaylist: function(id, name, owner, members) {
        Playlists.insert({
            'userId': id,
            'name': name,
            'owner': owner,
            'members': members
        });
    }
});
