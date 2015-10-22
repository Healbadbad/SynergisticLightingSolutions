/**
 * Created by rosspa on 10/21/2015.
 */

//Template.dashboard.onCreated(function() {
//   Meteor.call('addPlaylist', Meteor.userId(), "Test", Meteor.user().username, ['1234'])
//});
Playlists = new Meteor.Collection('playlists');
Template.dashboard.helpers({
    getPlaylists: function() {
        return Playlists.find();
    }
});