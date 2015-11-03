Meteor.methods({

    localUploadAndAnalyze: function (filename, data) {
        console.log("STARTING UPLOAD");

        var path = Npm.require('path');
        var fs = Npm.require('fs');

        var dir = path.resolve("..\\..\\..\\..\\..\\uploads"); // Get file location

        fs.writeFileSync(dir + "\\" + filename, data, 'binary');
    },

    echoUpload: function (filename, siteUrl) {

        Future = Npm.require("fibers/future");
        var future = new Future();
        var apiKey = "KZVTGHHVOTXY6XXYA";
        var url = "http://developer.echonest.com/api/v4/track/upload";
        var track = "http://137.112.224.135" + "/songs/" + encodeURI(filename);

        Meteor.http.post("http://developer.echonest.com/api/v4/track/upload?api_key=" + apiKey + "&url=" + track,
            {
                data: {},
                headers: {
                    "content-type": "application/octet-stream"
                }

            },
            function (err, res) {
                //if(res.statuscode === 200) {
                future.return(res.data.response.track.md5);
                //}
            });
        return future.wait();
    },

    getEchoUrl: function (md5) {
        var apiKey = "KZVTGHHVOTXY6XXYA";

        Future = Npm.require("fibers/future");

        var future = new Future();
        Meteor.http.get("http://developer.echonest.com/api/v4/track/profile?api_key=" + apiKey + "&format=json&md5=" + md5 + "&bucket=audio_summary",
            {
                data: {
                    "api_key": apiKey
                },
                headers: {
                    "content-type": "application/octet-stream"
                }
            },
            function (error, result) {
                jsonURL = result.data.response.track.audio_summary.analysis_url;
                future.return(jsonURL);

            });
        return future.wait();
    }
});
