var URate = 60; // The rate at which to update per beat cycle
var frame = 0; // The frame that is being displayed

// Calculation pre-performed, but adjustable later on
var smoothingRate = 1.0 / URate; // The rate at which to adjust the smoothing

var beatCounter = 0; // The beat that you are on
var segCounter = 0; // The segment that you are on

var currentBeat; // The current beat
var currentSegment; // The current segment

var d = new Date(); // Get the date
var ms = d.getTime();

var beatStart; // The time
var beatDuration; // The duration
var beatEnd; // The end time


var segmentStart;
var segmentDuration;
var segmentEnd;

var pitches;
var highestPitch;

var loop;

var currentColor;
var nextColor;

//lights = Meteor.require('lights');

var colorArray = [[0, 0, 255], [0, 127, 255], [0, 255, 255], [0, 255, 127], [0, 255, 0], [127, 255, 0],
    [255, 255, 0], [255, 127, 0],[255, 0, 0],[255, 0, 127],[255, 0, 255], [127, 0, 255]];

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
        var track = "http://137.112.151.148" + "/songs/" + encodeURI(filename);

        Meteor.http.post("http://developer.echonest.com/api/v4/track/upload?api_key=" + apiKey + "&url=" + track,
            {
                data: {},
                headers: {
                    "content-type": "application/octet-stream"
                }

            },
            function (err, res) {
                future.return(res.data.response.track.md5);
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
    },

    algorithmExponential : function (beats, segments) {
        if(Meteor.isServer) {
            console.log('this is where the magic will go.');

            var segAdjustment = 0.0; // The adjustment post-beat to apply to the next beat cycle
            var beatAdjustment = 0.0; // The adjustment post-beat to apply to the next beat cycle


            d = new Date();
            ms = d.getTime();

            currentBeat = beats[0];
            currentSegment = segments[0];

            beatStart = ms;
            segmentStart = ms;

            beatDuration = currentBeat.duration * 1000;
            segmentDuration = currentSegment.duration;

            beatEnd = beatStart + beatDuration;
            segmentEnd = segmentStart + segmentDuration;

            pitches = currentSegment.pitches;
            highestPitch = pitches.indexOf(Math.max.apply(Math,pitches));
            console.log(highestPitch);

            currentColor = {red: 0, green: 0, blue: 0};
            nextColor = {red: colorArray[highestPitch][0], green: colorArray[highestPitch][1], blue: colorArray[highestPitch][2]};
            console.log("CURRENT COLOR: " + currentColor.red + " NEXT COLOR: " + nextColor.red);

            loop = Meteor.setInterval(function(){
                updateLights(beats, segments, URate, smoothingRate);
            }, (1000 / URate));
        }
    }
});

function printStuff() {
    console.log("STUFF");
}

function updateLights(beats, segments, updateRate, smoothingRate) {
    if(beatCounter != beats.length - 1) {
        d = new Date();
        ms = d.getTime();
        advanceBeat(beats);
        advanceSegment(segments);
        updateColor();
    } else {
        clearInterval(loop);
    }

}

function advanceBeat(beats) {
    //console.log("BEAT DIAGNOSTIC\n" +"TIME: " + ms + " COUNT: " + beatCounter + " START: " + beatStart + " END: " + beatEnd
    //+ ' DURATION: ' + beatDuration);
    if(ms > beatEnd) { // Progress beat

        beatAdjustment = beatEnd - ms;
        beatCounter++;
        currentBeat = beats[beatCounter];
        beatStart = ms;
        beatDuration = currentBeat.duration * 1000 + beatAdjustment;
        beatEnd = ms + beatDuration;
        //console.log("UPDATED BEAT: " + beatCounter + " TOTAL BEATS: " + beats.length);
    }
}

function advanceSegment(segments) {
    if(ms > segmentEnd) {
        segAdjustment = segmentEnd - ms;
        segCounter++;
        currentSegment = segments[segCounter];
        segmentDuration = currentSegment.duration * 1000 + segAdjustment;
        segmentStart = ms;
        segmentEnd = ms + segmentDuration;
        //console.log("UPDATED SEGMENT " + segCounter);

        pitches = currentSegment.pitches;
        highestPitch = pitches.indexOf(Math.max.apply(Math,pitches));
        smoothingRate = URate / (segmentDuration);
        nextColor = {red: colorArray[highestPitch][0], green: colorArray[highestPitch][1], blue: colorArray[highestPitch][2]};
    }
}

function updateColor() {
    var redC = currentColor.red * (1 - smoothingRate) + nextColor.red * smoothingRate;
    var greenC = currentColor.green * (1 - smoothingRate) + nextColor.green * smoothingRate;
    var blueC = currentColor.blue * (1 - smoothingRate) + nextColor.blue * smoothingRate;
    console.log("RED ", redC + " CURRENT: " + currentColor.red + " NEXT: " + nextColor.red +
    "SMOOTHING RATE: " + smoothingRate);
    currentColor = {red: redC, green: greenC, blue: blueC};

    Meteor.call('setColorSolid', redC, greenC, blueC);
}

