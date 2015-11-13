/**
 * Created by Jeremy on 11/10/2015.
 */
Template.song.events({
   'dblclick .song': function(e, template) {
       console.log(this);
       var route = Router.current().location.get().rootUrl +"/songs/" + encodeURI(this.name) + ".mp3";
       console.log(route);
       mp3Player.src = route;
       mp3Player.autoplay = true;
       Session.set('activeSong', this.name);
   }
});

Template.song.helpers({
    activeSong: function() {
        return this.name == Session.get('activeSong');
    }
})