Template.createPlaylistModal.events({
    'keyup #new-playlist-name': function(e) {
        if (e.target.value) {
            $('#new-playlist-name-error').hide();
            $('#create-playlist-button').prop('disabled', false);
        } else{
            $('#new-playlist-name-error').show();
            $('#create-playlist-button').prop('disabled', true);
        }
    },
    'click #create-playlist-button': function(e){
        e.preventDefault();
        $('body').trigger({
            type: 'keyup',
            which: 27 // Escape key
        });
        e.stopPropagation();
        var playlistName = $('#new-playlist-name').val();
        Meteor.call('addPlaylist', Meteor.userId(), playlistName, Meteor.user().username, [], [], [Meteor.userId()]);
    },
    'click .cancel': function(e) {
        e.preventDefault();
        $('body').trigger({
            type: 'keyup',
            which: 27 // Escape key
        });
        e.stopPropagation();
    }
});