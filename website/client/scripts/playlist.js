Template.playlist.helpers({
  'getSongs' : function() {
    return Songs.find();
  },

  'canRemoveSong': function(songAdder) {

    user = Meteor.user().username;

    console.log(Template.instance().data.id, songAdder);

    return (user == songAdder || user == Playlists.find().fetch()[0].owner);
  }
});

Template.playlist.events({
  'click #addSong': function(e, template) {
    $('#fileUploader').click();
  },

  'click .play-song': function(e, template) {
    Session.set('playing-song', "http://137.112.151.148/songs/" + encodeURI(this.name) + '.mp3');
    Session.set('song-name', this.name);
    console.log(this.name);
    var url = Songs.find({name: this.name}).fetch()[0].url;
    console.log(url);
  },

  'change #fileUploader': function(e, template) {
    file = $("input[type='file']")[0].files[0];
    var filename = file.name;
    var parsedFilename = filename;
    var parsedArtist = "";

    var reader = new FileReader();
    console.log(template);

    toastr.options = {
      timeOut: "20000",
      positionClass: "toast-bottom-full-width"
    };

    parser = filename.indexOf('-');
    if(parser != -1) {
      parsedArtist = filename.substr(0, parser-1);
      parsedFilename = filename.substr(parser + 2, filename.length);
    }


    reader.onloadend = function () {
      var value = reader.result;


      toastr.success("Uploading selected song. Wait just a moment...");
      console.log(parsedFilename.substr(0, parsedFilename.length - 4));
      Meteor.call('localUploadAndAnalyze', parsedFilename, value);
      Meteor.call('echoUpload', parsedFilename, Router.current().location.get().rootUrl, function(err, md5) {
        if(err) {
          Songs.insert({
            name: parsedFilename.substr(0, parsedFilename.length - 4),
            artist: parsedArtist,
            playlist: [template.data.id],
            uploadedBy: Meteor.user().username
          });
        }
        Meteor.call('getEchoUrl', md5, function(err, url) {




            Songs.insert({
              name: parsedFilename.substr(0, parsedFilename.length - 4),
              artist: parsedArtist,
              playlist: [template.data.id],
              uploadedBy: Meteor.user().username,
              md5: md5,
              url: url
          });
          toastr.clear();
        });
      });

    };
    reader.readAsBinaryString(file);
  },

  'click .remove-song': function(e) {
    console.log(this);
    Songs.remove({_id: this._id})
  }
});
