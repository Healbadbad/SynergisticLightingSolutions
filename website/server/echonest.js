var URate = 120; // The rate at which to update per beat cycle
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

var isPaused;
var isRunning;

var opc_client = Npm.require('open-pixel-control');


//var sys = require('sys');
//var exec = require('child_process').exec;
//function puts(error, stdout, stderr) { sys.puts(stdout)
//sys.puts(stderr)}



var client = new opc_client({address:'137.112.151.224',port:7890});
client.on('connected',function(){
    var strip = client.add_strip({length:600});
});



client.connect();
var pixels_main = [];
var pixels_temp = [];
for(var i=0;i<600;i++){
    pixels_main[i]  = [180,255,255];
    pixels_temp[i]  = [180,255,255];
}

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

    writeJSONFile: function(jsonDoc, filename) {

        var path = Npm.require('path');
        var fs = Npm.require('fs');

        var dir = path.resolve("..\\..\\..\\..\\..\\jsonDocs"); // Get file location

        fs.writeFileSync(dir + "\\" + filename, jsonDoc, 'binary');
    },

    getJSONFile: function(filename) {

        console.log(filename);

        var path = Npm.require('path');
        var fs = Npm.require('fs');

        var dir = path.resolve("..\\..\\..\\..\\..\\jsonDocs"); // Get file location

        console.log(dir + "\\" + filename);

        data = fs.readFileSync(dir + "\\" + filename).toString();
    },

    echoUpload: function (filename, siteUrl) {

        Future = Npm.require("fibers/future");
        var future = new Future();
        var apiKey = "KZVTGHHVOTXY6XXYA";
        var url = "http://developer.echonest.com/api/v4/track/upload";
        var track = SONG_ADDRESS + encodeURI(filename);

        Meteor.http.post("http://developer.echonest.com/api/v4/track/upload?api_key=" + apiKey + "&url=" + track,
            {
                data: {},
                headers: {
                    "content-type": "application/octet-stream"
                }

            },
            function (err, res) {
                console.log(res);

                if((res.data.response.track) == undefined) {
                    future.return(undefined);
                } else {
                    future.return(res.data.response.track.md5);
                }
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

            beatCounter = 0;
            segCounter = 0;

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

            isRunning = true;
            isPaused = false;

            loop = Meteor.setInterval(function(){
                updateLights(beats, segments, URate, smoothingRate);
            }, (1000 / URate));
        }
    },

    clearAlgorithm: function() {
        isRunning = false;
        clearInterval(loop);
    },

    pauseAlgorithm: function() {
        isPaused = true;
    },

    continueAlgorithm: function() {
        isPaused = false;
    },

    isAlgorithmRunning: function() {
        return isRunning;
    }
});

function updateLights(beats, segments, updateRate, smoothingRate) {
    if(beatCounter != beats.length - 1) {
        d = new Date();
        ms = d.getTime();
        if(!isPaused) {
            advanceBeat(beats);
            advanceSegment(segments);
            updateColor(true);
        } else {
            fadeToWhite();
            updateColor(false);
        }
    } else {
        fadeToWhite();
        updateColor(false);
        clearInterval(loop);
    }

}

function advanceBeat(beats) {

    if(ms > beatEnd) { // Progress beat

        beatAdjustment = beatEnd - ms;
        beatCounter++;
        currentBeat = beats[beatCounter];
        beatStart = ms;
        beatDuration = currentBeat.duration * 1000 + beatAdjustment;
        beatEnd = ms + beatDuration;
    }
}

function advanceSegment(segments) {
    if(ms > segmentEnd) {
        segAdjustment = segmentEnd - ms;
        segCounter++;
        currentSegment = segments[segCounter];
        segmentDuration = currentSegment.duration * 1000 + segAdjustment;
        if(segmentDuration < 400) {
            segCounter++;
            currentSegment = segments[segCounter];
            segmentDuration += currentSegment.duration * 1000;
        }
        segmentStart = ms;
        segmentEnd = ms + segmentDuration;
        //console.log("UPDATED SEGMENT " + segCounter);

        pitches = currentSegment.pitches;
        highestPitch = pitches.indexOf(Math.max.apply(Math,pitches));
        smoothingRate = URate / (segmentDuration * 2);
        nextColor = {red: colorArray[highestPitch][0], green: colorArray[highestPitch][1], blue: colorArray[highestPitch][2]};
    }
}

function updateBounce() {
    var colorC = 255 - (255 * (ms - beatStart) / (beatEnd - beatStart));
    //console.log(colorC);

}

function updateColor(shouldChangeIntensity) {
    if(shouldChangeIntensity) {
        intensity = Math.min(1, 1.2 - ((ms - beatStart) / (beatEnd - beatStart)));
    } else {
        intensity = 1;
    }
    var redC = currentColor.red * (1 - smoothingRate) + nextColor.red * smoothingRate;
    var greenC = currentColor.green * (1 - smoothingRate) + nextColor.green * smoothingRate;
    var blueC = currentColor.blue * (1 - smoothingRate) + nextColor.blue * smoothingRate;
    //console.log("RED ", redC + " CURRENT: " + currentColor.red + " NEXT: " + nextColor.red +
    //"SMOOTHING RATE: " + smoothingRate);
    currentColor = {red: redC, green: greenC, blue: blueC};
    setColorSolid(redC * intensity, greenC * intensity, blueC * intensity);
}

function setColorSolid(r, g, b) {

    var temp = [r, g, b];
    for (var i = 0; i < 600; i++) {
        pixels_main[i][0] = temp[0];
        pixels_main[i][1] = temp[1];
        pixels_main[i][2] = temp[2];

    }
    client.put_pixels(0, pixels_main);
}

function fadeToWhite() {
    nextColor = {red: 180, green: 255, blue: 255};
}


