Meteor.methods({

    uploadEchoFile: function(file, apiKey, callback) {
        console.log("start");
        console.log(callback);
        var jsonURL;
        var apiKey = "KZVTGHHVOTXY6XXYA";
        var url = "http://developer.echonest.com/api/v4/track/upload";
        console.log("\n\n\n\n\n\n\n\n\n");
        track = "http://tylergrund.com/mp3/MP3s%20from%20home/Coldplay/01%20Speed%20Of%20Sound.mp3";
        Meteor.http.call("POST",
            "http://developer.echonest.com/api/v4/track/upload?api_key=" + apiKey + "&url=" + track,
            {
                data:{
                    "api_key": apiKey,
                    "url": track
                },
                headers:{
                    "content-type": "application/octet-stream"
                }
            },
            function(error, result){
                if (result.statusCode === 200) {
                    var trackID = result.data.response.track.id;
                    jsonURL = Meteor.call('meteorisGay', apiKey, trackID, callback);
                }
            }
        );
    },

    meteorisGay: function(apiKey, trackID, callback){
        var jsonURL;
        Meteor.http.call("GET",
            "http://developer.echonest.com/api/v4/track/profile?api_key=" + apiKey + "&format=json&id=" + trackID + "&bucket=audio_summary",
            {
                data:{
                    "api_key": apiKey,
                    "url": track
                },
                headers:{
                    "content-type": "application/octet-stream"
                }
            },
            function(error, result){
                if (result.statusCode === 200) {
                    jsonURL = result.data.response.track.audio_summary.analysis_url;
                    console.log(jsonURL);
                    console.log("please leave");
                    console.log(callback);
                    callback(jsonURL);
                }
            }
        );
        return jsonURL;
    }
});