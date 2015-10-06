Meteor.methods({
    uploadEchoFile: function(file, apiKey) {

        var url = "http://developer.echonest.com/api/v4/track/upload";
        console.log(apiKey);
        var options = {
            header: {'Content-Type': 'multipart/form-data'},
            content: file
        };
        HTTP.call("POST", "http://developer.echonest.com/api/v4/track/upload?api_key=" + apiKey + "&filetype=mp3", options, function(err, res) {
            console.log(res);
        });
    }
});