/**
 * Created by Jeremy on 11/8/2015.
 */
Template.homepageNavbar.onCreated(function() {
    Session.set('sideNav', 'musicSubNav');
    Session.set('mainNav', 'musicMainNav');
    Session.set('screen', 'songlist');
    //Session.set('activePlaylist', Playlists.find().fetch()[0]._id)
});

Template.homepageNavbar.events({
   'click #setNavLight': function() {
       Session.set('sideNav', 'lightSubNav');
   },

    'click #setNavMusic': function() {
        Session.set('sideNav', 'musicSubNav');
    }
});