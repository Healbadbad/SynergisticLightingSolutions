/**
 * Created by wrightjt on 10/2/2015.
 */
Template.test.events({
   'change input': function(e) {
       files = $("input[type='file']")[0].files[0];
       // console.log(files);
       // e.preventDefault();
       // e.stopPropagation();
       // var reader = new FileReader();
       // console.log(files);
       // //reader.onloadend = function() {
           //console.log(reader.result);
       // Meteor.call('uploadEchoFile', files, "IQ8ICKDOZGGE74XJQ", function(url){
       //    console.log("this is dumb " + url);
          
       // });
       var md5;
       var json;
       var apiKey = "IQ8ICKDOZGGE74XJQ";
       var filename = files.name;
       var storedFile;
       console.log(filename);

       var freader = new FileReader();

       freader.onloadend = function() {
           storedFile = freader.result;
           //console.log(storedFile);
       };

       freader.readAsDataURL(files);

       //storedFile = JSON.stringify(files);
       console.log(storedFile);
       //Meteor.call('saveSong', files);
       //var buffer = new Buffer(files);
       Meteor.call('uploadEchoFile', files, "IQ8ICKDOZGGE74XJQ", function(err, res) {
           Meteor.call('getEchoUrl', res, apiKey, function(err, urlres) {
               console.log(urlres);
               json = $.getJSON(urlres, function(data) {
                   var finaldata = {
                       beats: data.beats,
                       segments: data.segments
                   };
                   console.log(finaldata);
                   Meteor.call('addSongToPlaylist', 10, "pisswater.com", urlres, storedFile);
               });
           });
       });


       //Meteor.call('searchYoutube', 'sad machine');
   }
});

//
//function iFuckingHateMeteor(jsonURL){
//  Meteor.http.call("GET",
//    jsonURL,
//    function(error, result){
//      if(result.statusCode === 200){
//        console.log("fuck this shit");
//        console.log(result);
//      }
//    }
//  );
//}

            //function(error, result){
                //if (result.statusCode === 200) {
                //    var trackID = result.data.response.track.id;
                //    Meteor.http.call("GET",
                //        "http://developer.echonest.com/api/v4/track/profile?api_key=" + apiKey + "&format=json&id=" + trackID + "&bucket=audio_summary",
                //        {
                //            data:{
                //                "api_key": apiKey,
                //                "url": track
                //            },
                //            headers:{
                //                "content-type": "application/octet-stream"
                //            }
                //        },
                //        function(error, result){
                //            if (result.statusCode === 200) {
                //                jsonURL = result.data.response.track.audio_summary.analysis_url;
                //                console.log(jsonURL);
                //                console.log("returning");
                //                onComplete(error, result);
                //            }
                //        }
                //    );

                //}
            //}
    //    );
    //},

    //meteorisGay: function(apiKey, trackID, callback){
    //    var jsonURL;
    //    Meteor.http.call("GET",
    //        "http://developer.echonest.com/api/v4/track/profile?api_key=" + apiKey + "&format=json&id=" + trackID + "&bucket=audio_summary",
    //        {
    //            data:{
    //                "api_key": apiKey,
    //                "url": track
    //            },
    //            headers:{
    //                "content-type": "application/octet-stream"
    //            }
    //        },
    //        function(error, result){
    //            if (result.statusCode === 200) {
    //                jsonURL = result.data.response.track.audio_summary.analysis_url;
    //                console.log(jsonURL);
    //                console.log("please leave");
    //                console.log(callback);
    //                callback(jsonURL);
    //            }
    //        }
    //    );
    //    return jsonURL;
    //}
//});