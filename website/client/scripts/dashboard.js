/**
 * Created by rosspa on 10/21/2015.
 */

//Template.dashboard.onCreated(function() {
//   Meteor.call('addPlaylist', Meteor.userId(), "Test", Meteor.user().username, ['1234'], [Meteor.userId()]);
//});
var playlist_index = 0;
Playlists = new Meteor.Collection('playlists');
Template.dashboard.helpers({
    getPlaylists: function() {
        return Playlists.find();
    },
    getPlaylistIndex: function() {
        playlist_index++;
        return playlist_index;
    },
    isAuthorized: function(authorizedIds, currentUserId) {
        console.log("start");
        console.log(authorizedIds);
        console.log(currentUserId);
        console.log(authorizedIds.indexOf(currentUserId));
        return authorizedIds.indexOf(currentUserId) != -1;
    }
});

Template.dashboard.events({
    'click #createPlaylistModalButton': function() {
        $('#createPlaylist').foundation("reveal", "open");
    }
});