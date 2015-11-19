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
    },

    playlistHasNoSongs: function() {
        var playlist = Playlists.find({_id: Session.get('activePlaylist')}).fetch()[0];
        return _.isUndefined(playlist) || _.isEmpty(playlist.songs);
    }
});

Template.songList.events({
    'click #addSong': function() {
        $('#fileSelector').click();
    },

    'change #fileSelector': function() {
        _.each($('#fileSelector')[0].files, function(item) {

            // Store immediately for dynamic UI, but create loading features
            var name = item.name.substr(0, item.name.length - 4);
            var parsedMetaData = name.split(" - ");
            var storedArtist;
            var storedName;
            var fullName = "";
            if(parsedMetaData.length > 1) {
                storedArtist = parsedMetaData[0];
                storedName = parsedMetaData[1];
            } else {
                storedArtist = "";
                storedName = parsedMetaData[0];
            }

            fullName = storedName + ".mp3";

            var song = Songs.insert({
                name: storedName,
                mp3: fullName,
                uploadedBy: Meteor.user().username,
                artist: storedArtist
            });

            Playlists.update(
                {_id: Session.get('activePlaylist')},
                {$push: {songs: song}}
            );

            setTimeout(function() {
                analyzeSong(fullName, item, song);
            }, 0);

        });
    }
});

function analyzeSong(songName, songFile, id) {

    var freader = new FileReader(); // Generate a file reader for each file

    freader.onloadend = function() {
        var songBinary = freader.result;
        Meteor.call('localUploadAndAnalyze', songName, songBinary, function(err, res) {
            console.log("Updating locally");
            Meteor.call('echoUpload', songName, Router.current().location.get().rootUrl, function (err, md5) {
                if (md5 == undefined) {
                    console.log("MD5 UNDEFINED. BUILD CASE FOR THIS.");
                } else {
                    getURL(md5, songName, id);
                }
            });
        });
    };
    freader.readAsBinaryString(songFile);
}

function getURL(md5, songName, id) {
  Meteor.call('getEchoUrl', md5, function (err, url) {
    console.log("Looped");
    $.getJSON(url, function (data) {
      Meteor.call('writeJSONFile', JSON.stringify(data), songName.substr(0, songName.length - 4) + ".json");
      Songs.update({
        _id: id
      }, {
        $set: {
          analyzed: true
        }
      });
    }).fail(function() {getURL(md5)});
  });
}