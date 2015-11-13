/**
 * Created by Jeremy on 11/10/2015.
 */
Template.songList.helpers({
    getPlaylistSongs: function() {
        var playlist = Playlists.find({_id: Session.get('activePlaylist')}).fetch()[0];
        console.log("Playlist", playlist);
        if(!_.isUndefined(playlist) && !_.isUndefined(playlist.songs)) {
            console.log(playlist.songs);
            console.log(Songs.find({_id: {$in: playlist.songs}}));
            return Songs.find({_id: {$in: playlist.songs}});
        }
        console.log("returned null");

        return null;
    }
});