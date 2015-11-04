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

  'change #fileUploader': function(e, template) {
    file = $("input[type='file']")[0].files[0];
    var filename = file.name;


    var reader = new FileReader();
    console.log(template);


    Songs.insert({
      name: filename.substr(0, filename.length - 4),
      artist: "",
      playlist: [template.data.id],
      uploadedBy: Meteor.user().username,
      md5: "",
      url: ""
    });


    reader.onloadend = function () {
      var value = reader.result;



    //  Meteor.call('localUploadAndAnalyze', filename, value);
    //
    //  Meteor.call('echoUpload', filename, Router.current().location.get().rootUrl, function(err, md5) {
    //    Meteor.call('getEchoUrl', md5, function(err, url) {
    //      $.getJSON(url, function(data) {
    //
    //      });
    //    });
    //  });
    };
    var audio = new Audio(file);
    reader.readAsBinaryString(file);
  },

  'click .remove-song': function(e) {
    console.log(this);
    Songs.remove({_id: this._id})
  }
});
