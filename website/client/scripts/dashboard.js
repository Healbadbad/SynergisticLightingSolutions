/**
 * Created by rosspa on 10/21/2015.
 */

var playlist_index = 0;
Template.dashboard.helpers({
    getPlaylists: function() {
        return Playlists.find();
    },
    getPlaylistIndex: function() {
        playlist_index++;
        return playlist_index;
    },
    isAuthorized: function(authorizedIds, currentUserId) {
        return authorizedIds.indexOf(currentUserId) != -1;
    }
});

Template.dashboard.events({
    'click #create-playlist-modal-button': function() {
        $('#create-playlist').foundation("reveal", "open");
    },
    'click #delete-playlist-button': function(e, template) {
        Playlists.remove({_id: this._id});
    }

});