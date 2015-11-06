/**
 * Created by wrightjt on 10/2/2015.
 */


Template.test.events({
    'change input': function (e) {
        files = $("input[type='file']")[0].files[0];
        var filename = files.name;

        var reader = new FileReader();

        reader.onloadend = function () {
            var value = reader.result;

            toastr.success("Uploading song");
            Meteor.call('localUploadAndAnalyze', filename, value, function(err, res) {
                toastr.clear();
            });

            Meteor.call('echoUpload', filename, Router.current().location.get().rootUrl, function(err, md5) {
                Meteor.call('getEchoUrl', md5, function(err, url) {
                    $.getJSON(url, function(data) {
                        console.log(data);

                        var musicPlayer = new Audio();
                        var song = "http://137.112.151.148/songs/" + encodeURI(filename);
                        console.log(song);
                        musicPlayer.src = song;

                        Meteor.call('algorithmExponential', data.beats, data.segments);

                        musicPlayer.autoplay = true;


                    });
                });
            });
        };
        reader.readAsBinaryString(files);
    }
});
