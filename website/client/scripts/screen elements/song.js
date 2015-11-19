/**
 * Created by Jeremy on 11/10/2015.
 */
Template.song.events({
   'dblclick .song': function(e, template) {
       console.log(this);
       var baseRoute = Router.current().location.get().rootUrl;
       var route = baseRoute + "/songs/" + encodeURI(this.name) + ".mp3";
       console.log(route);
       mp3Player.src = route;
       var url = baseRoute + "/jsonDocs/" + this.name + '.json';
       $.getJSON(url, function(data) {
           Meteor.call('clearAlgorithm');
           Meteor.call('algorithmExponential', data.beats, data.segments);
       });
       mp3Player.autoplay = true;
       Session.set('activeSong', this.name);
   }
});

Template.song.helpers({
    activeSong: function() {
        return this.name == Session.get('activeSong');
    }
});