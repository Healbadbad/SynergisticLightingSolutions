Template.playlist.helpers({
  'getSongs' : function() {
    return Songs.find();
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
    console.log(template);

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
      console.log(parsedFilename.substr(0, parsedFilename.length - 4));
      Meteor.call('localUploadAndAnalyze', parsedFilename, value);
      Songs.insert({
        name: parsedFilename.substr(0, parsedFilename.length - 4),
        artist: parsedArtist,
        playlist: [template.data.id],
        uploadedBy: Meteor.user().username
      });


    };
    reader.readAsBinaryString(file);
  },

  'click .remove-song': function(e) {
    Songs.remove({_id: this._id});
  },

  'click #analyzeSong': function(e) {
    console.log(this.name + ".mp3");
    self = this;
    Meteor.call('echoUpload', this.name + ".mp3", Router.current().location.get().rootUrl, function (err, md5) {
      if (md5 == undefined) {

      } else {
        Meteor.call('getEchoUrl', md5, function (err, url) {

          $.getJSON(url, function (data) {
            console.log("Called data writer");
            Meteor.call('writeJSONFile', JSON.stringify(data), self.name + ".json");
          });

          Songs.update({
            _id: self._id
          }, {
            $set: {
              md5: md5,
              json: self.name + ".json"
            }
          });
        });
      }
    });
  }
});
