//Meteor.methods({
//
//    uploadEchoFile: function(file, apiKey) {
//        console.log("start");
//        var jsonURL;
//        var apiKey = "KZVTGHHVOTXY6XXYA";
//        var url = "http://developer.echonest.com/api/v4/track/upload";
//        var track = "http://tylergrund.com/mp3/MP3s%20from%20home/Coldplay/01%20Speed%20Of%20Sound.mp3";
//
//        var future = new Future();
//        var onComplete = future.resolver();
//
//        Meteor.http.call("POST",
//            "http://developer.echonest.com/api/v4/track/upload?api_key=" + apiKey + "&url=" + track,
//            {
//                data:{
//                    "api_key": apiKey,
//                    "url": track
//                },
//                headers:{
//                    "content-type": "application/octet-stream"
//                }
//            },
//
//            function(error, result){
//                if (result.statusCode === 200) {
//                    var trackID = result.data.response.track.id;
//                    Meteor.http.call("GET",
//                        "http://developer.echonest.com/api/v4/track/profile?api_key=" + apiKey + "&format=json&id=" + trackID + "&bucket=audio_summary",
//                        {
//                            data:{
//                                "api_key": apiKey,
//                                "url": track
//                            },
//                            headers:{
//                                "content-type": "application/octet-stream"
//                            }
//                        },
//                        function(error, result){
//                            if (result.statusCode === 200) {
//                                jsonURL = result.data.response.track.audio_summary.analysis_url;
//                                console.log(jsonURL);
//                                console.log("returning");
//                                onComplete(error, result);
//                            }
//                        }
//                    );
//
//                    return future;
//                }
//            }
//        );
//        Future.wait(future);
//    },
//
//    meteorisGay: function(apiKey, trackID, callback){
//        var jsonURL;
//        Meteor.http.call("GET",
//            "http://developer.echonest.com/api/v4/track/profile?api_key=" + apiKey + "&format=json&id=" + trackID + "&bucket=audio_summary",
//            {
//                data:{
//                    "api_key": apiKey,
//                    "url": track
//                },
//                headers:{
//                    "content-type": "application/octet-stream"
//                }
//            },
//            function(error, result){
//                if (result.statusCode === 200) {
//                    jsonURL = result.data.response.track.audio_summary.analysis_url;
//                    console.log(jsonURL);
//                    console.log("please leave");
//                    console.log(callback);
//                    callback(jsonURL);
//                }
//            }
//        );
//        return jsonURL;
//    }
//});

//Npm.require('phantomjs');
//var jq = Npm.require('jquery');

Meteor.methods({

    uploadEchoFile: function (file, apiKey) {
        Future = Npm.require("fibers/future");
        var future = new Future();
        var jsonURL;
        var apiKey = "KZVTGHHVOTXY6XXYA";
        var url = "http://developer.echonest.com/api/v4/track/upload";
        var track = "http://tylergrund.com/mp3/MP3s%20from%20home/Coldplay/01%20Speed%20Of%20Sound.mp3";


        Meteor.http.post("http://developer.echonest.com/api/v4/track/upload?api_key=" + apiKey + "&url=" + track,
            {
                data: {
                    "api_key": apiKey,
                    "url": track
                },
                headers: {
                    "content-type": "application/octet-stream"
                }

            },
            function(err, res) {
                //if(res.statuscode === 200) {
                    Meteor.call('getEchoUrl', res.data.response.track.md5, apiKey);
                    future.return(res.data.response.track.md5);
                //}
            });
            return future.wait();
    },

    getEchoUrl: function(md5, apiKey) {
        Future = Npm.require("fibers/future");
        var future = new Future();
        Meteor.http.get("http://developer.echonest.com/api/v4/track/profile?api_key=" + apiKey + "&format=json&md5=" + md5 + "&bucket=audio_summary",

            {
                data:{
                    "api_key": apiKey
                    //"url": track
                },
                headers:{
                    "content-type": "application/octet-stream"
                }
            },
            function(error, result){
                jsonURL = result.data.response.track.audio_summary.analysis_url;
                //Meteor.call('parseJSONfile', jsonURL);
                future.return(jsonURL);

        });
        return future.wait();
    },

    saveSong: function(file, location) {
        var fs = Npm.require('fs');
        var path = Npm.require('path');

        var filepath = root + file.name;
        var buffer = new Buffer(file);
        fs.writeFileSync(filepath, buffer);
    },

    exponentialNesting: function() {
        console.log('this is where the magic will go.')
    }

    //searchYoutube: function(query){
    //    var searchq = query.replace(" ", "+");
    //    var params = {
    //        key: "AIzaSyDuyYR4yGdSzLxeygY90AhZ29UaQGWMRE0",
    //        part: "snippet",
    //        q: searchq,
    //        maxResults: 5
    //    }
    //    Meteor.http.get("https://www.googleapis.com/youtube/v3/search",
    //        {params: params},
    //        function(error, result){
    //            if(error){
    //                console.log(error);
    //            }
    //            var title = result.data.items[0].snippet.title;
    //            var vidID = result.datr.items[0].id.videoId;
    //            var vidURL = "http://www.youtube.com/watch?v=" + vidID;
    //        }
    //    );
    //}
//    function searchYoutube(){
//    var q = document.getElementById("video").value;
//    var searchq = q.replace(" ", "+");
//
//    $.ajax({
//        url: 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=' + searchq + '&key=AIzaSyDuyYR4yGdSzLxeygY90AhZ29UaQGWMRE0',
//        type: 'GET',
//        dataType: 'json',
//        data:{
//
//        },
//        success: function(resp){
//            vidId = resp.items[0].id.videoId;
//            var title = resp.items[0].snippet.title;
//            var vidURL = "http://www.youtube.com/watch?v=" + vidId;
//            document.getElementById("results").innerHTML = "";
//
//            for(var item in resp.items)
//            {
//                console.log(resp.items[item].id.videoId);
//                document.getElementById("results").innerHTML = document.getElementById("results").innerHTML + "<p onclick=\"playSong(" + resp.items[item].id.videoId
//                    + ");\">" + resp.items[item].snippet.title + "<br /> <img src=\"" + resp.items[item].snippet.thumbnails.default.url + "\" /> </p> <br />";
//            }
//        },
//        error: function(XMLHttpRequest, textStatus, errorThrown){
//            alert("Could not search.");
//        }
//    });
//}
});

