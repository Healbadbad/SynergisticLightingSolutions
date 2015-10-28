/**
 * Created by Jeremy on 10/28/2015.
 */

MP3s = new FS.Collection("mp3s", {
    stores: [new FS.Store.FileSystem("mp3s", {path: Meteor.rootPath + "uploads"})]
});