Template.playlist.helpers({
  'getSongs' : function() {
    //var playlistArray = ;
    return Songs.find({_id: {$in: Playlists.find().fetch()[0].songs}});
  },

  'canRemoveSong': function(songAdder) {

    user = Meteor.user().username;

    console.log(Template.instance().data.id, songAdder);

    return (user == songAdder || user == Playlists.find().fetch()[0].owner);
  },

  'playlistName': function() {
    return Playlists.find().fetch()[0].name;
  },

  'hasUrl': function(url) {
    console.log(url);
    return url == undefined;
  }
});

Template.playlist.events({
  'click #addSong': function(e, template) {
    $('#fileUploader').click();
  },

  'click .play-song': function(e, template) {
    Session.set('playing-song', SONG_ADDRESS + encodeURI(this.name) + '.mp3');
    Session.set('song-name', this.name);
  },

  'change #fileUploader': function(e, template) {
    file = $("input[type='file']")[0].files[0];
    var filename = file.name;
    var parsedFilename = filename;
    var parsedArtist = "";

    var reader = new FileReader();

    var self = this;

    toastr.options = {
      timeOut: "5000",
      positionClass: "toast-bottom-full-width"
    };

    parser = filename.indexOf('-');
    if(parser != -1) {
      parsedArtist = filename.substr(0, parser-1);
      parsedFilename = filename.substr(parser + 2, filename.length);
    }


    reader.onloadend = function () {
      var value = reader.result;




      toastr.success("Song successfully uploaded");
      Meteor.call('localUploadAndAnalyze', parsedFilename, value);
      var song = Songs.insert({
        name: parsedFilename.substr(0, parsedFilename.length - 4),
        artist: parsedArtist,
        uploadedBy: Meteor.user().username
      });
      console.log("ID: ", self.id);
      Playlists.update({_id: self.id}, {
        $push: {songs: song}
      });
    };
    reader.readAsBinaryString(file);
  },

  'click .remove-song': function(e) {
    console.log(this);
    var playlistId = Playlists.find().fetch()[0]._id;
    Playlists.update({
      _id: playlistId
    }, {
      $pull: {songs: this._id}
    });
  },

  'click #analyzeSong': function(e) {
    self = this;

    Meteor.call('echoUpload', this.name + ".mp3", Router.current().location.get().rootUrl, function (err, md5) {
      if (md5 == undefined) {
        $('#analyzeSong').click();
      } else {
        getURL(md5);
      }
    });
  }
});

function getURL(md5) {
  Meteor.call('getEchoUrl', md5, function (err, url) {
    console.log("Looped");
    $.getJSON(url, function (data) {
      Meteor.call('writeJSONFile', JSON.stringify(data), self.name + ".json");
      Songs.update({
        _id: self._id
      }, {
        $set: {
          analyzed: true
        }
      });
    }).fail(function() {getURL(md5)});
  });
}
