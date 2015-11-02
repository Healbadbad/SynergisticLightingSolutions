/**
 * Created by Jeremy on 10/28/2015.
 */
fs = Npm.require('fs');
rootPath = fs.realpathSync('.');
console.log(rootPath + "..\\..\\..\\.." +  "\\uploads");
MP3s = new FS.Collection("mp3s", {
    stores: [new FS.Store.FileSystem("mp3s", {path: rootPath + "\\uploads"})]
});