/**
 * Created by wrightjt on 10/13/2015.
 */
var Playlists = new Mongo.Collection('playlists');

Meteor.methods({
    addPlaylist: function(name, owner, members) {
        Playlists.insert({
            'name': name,
            'owner': owner,
            'members': members
        });
    }
});
