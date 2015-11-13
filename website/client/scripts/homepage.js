/**
 * Created by Jeremy on 11/8/2015.
 */

mp3Player = new Audio();
mp3Player.autoplay = false;

Template.homepage.helpers({
    chooseSidebar: function() {
        return Session.get('sideNav');
    },

    chooseMainNav: function() {
        return Session.get('mainNav');
    },

    chooseScreen: function() {
        return Session.get('screen');
    }
});
