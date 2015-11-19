/**
 * Created by Jeremy on 11/12/2015.
 */
Template.playlistList.helpers({
    getPlaylists: function() {
        return Playlists.find();
    }
});

Template.playlistList.events({
   'click #addPlaylist': function() {
       $('#addPlaylistModal').foundation('reveal', 'open');
   },

    'click #createPlaylist': function() {
        console.log("words");
        var name = $('#playlistName').val;
        console.log(name);

        Playlists.insert({
            name: name,
            owner: Meteor.user().username,
            userId: Meteor.user()._id,
            members: []
        });
        $('#addPlaylistModal').foundation('reveal', 'close');
    }
});

Template.playlistList.onRendered(function() {
   $(document).foundation();
    $('#createPlaylist').click(function() {
        var name = $('#playlistName').val();
        console.log(name);

        Playlists.insert({
            name: name,
            owner: Meteor.user().username,
            userId: Meteor.user()._id,
            members: [],
            songs: []
        });
        $('#addPlaylistModal').foundation('reveal', 'close');
    });

});