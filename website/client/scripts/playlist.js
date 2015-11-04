Template.playlist.helpers({
  'getSongs' : function() {
    return Songs.find();
  }
});

Template.playlist.events({
  'remove-song': function(e, template) {
    files = $("input[type='file']")[0].files[0];
    var filename = files.name;

    var reader = new FileReader();

    reader.onloadend = function () {
      var value = reader.result;

      Meteor.call('localUploadAndAnalyze', filename, value);

      Meteor.call('echoUpload', filename, Router.current().location.get().rootUrl, function(err, md5) {
        Meteor.call('getEchoUrl', md5, function(err, url) {
          $.getJSON(url, function(data) {
            console.log(data);
          });
        });
      });
    };
    var audio = new Audio(files);
    reader.readAsBinaryString(files);
  }
});
